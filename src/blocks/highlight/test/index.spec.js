/**
 * External dependencies
 */
import { castArray, omit, stubFalse } from 'lodash';
import { registerBlockType, createBlock, serialize, getBlockType, getBlockAttributes, isValidBlockContent } from '@wordpress/blocks';
import { parse } from '@wordpress/block-serialization-default-parser';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// TODO: Extract this into a helper file.
// Pulled from @wordpress/blocks because it's not easily accessible from the npm package.
// https://github.com/WordPress/gutenberg/blob/403fa51163f2122017625ca94f852fb4c863d145/packages/blocks/src/api/parser.js#L293-L370
function getMigratedBlock( block, parsedAttributes ) {
	const blockType = getBlockType( block.name );

	const { deprecated: deprecatedDefinitions } = blockType;
	if ( ! deprecatedDefinitions || ! deprecatedDefinitions.length ) {
		return block;
	}

	const { originalContent, innerBlocks } = block;

	for ( let i = 0; i < deprecatedDefinitions.length; i++ ) {
		// A block can opt into a migration even if the block is valid by
		// defining isEligible on its deprecation. If the block is both valid
		// and does not opt to migrate, skip.
		const { isEligible = stubFalse } = deprecatedDefinitions[ i ];
		if ( block.isValid && ! isEligible( parsedAttributes, innerBlocks ) ) {
			continue;
		}

		// Block type properties which could impact either serialization or
		// parsing are not considered in the deprecated block type by default,
		// and must be explicitly provided.
		const deprecatedBlockType = Object.assign(
			omit( blockType, [ 'attributes', 'save', 'supports' ] ),
			deprecatedDefinitions[ i ]
		);

		let migratedAttributes = getBlockAttributes(
			deprecatedBlockType,
			originalContent,
			parsedAttributes
		);

		// Ignore the deprecation if it produces a block which is not valid.
		const isValid = isValidBlockContent(
			deprecatedBlockType,
			migratedAttributes,
			originalContent
		);

		if ( ! isValid ) {
			continue;
		}

		block = {
			...block,
			isValid: true,
		};

		let migratedInnerBlocks = innerBlocks;

		// A block may provide custom behavior to assign new attributes and/or
		// inner blocks.
		const { migrate } = deprecatedBlockType;
		if ( migrate ) {
			( [
				migratedAttributes = parsedAttributes,
				migratedInnerBlocks = innerBlocks,
			] = castArray( migrate( migratedAttributes, innerBlocks ) ) );
		}

		block.attributes = migratedAttributes;
		block.innerBlocks = migratedInnerBlocks;
	}

	return block;
}

// TODO: Extract this into a helper file.
// Pulled from @wordpress/blocks and simplified because it's not easily accessible from the npm package.
// https://github.com/WordPress/gutenberg/blob/403fa51163f2122017625ca94f852fb4c863d145/packages/blocks/src/api/parser.js#L372-L467
function createBlockWithFallback( blockNode ) {
	const { blockName, attrs, innerBlocks, innerHTML } = blockNode;
	const blockType = getBlockType( blockName );

	let block = createBlock(
		blockName,
		getBlockAttributes( blockType, innerHTML, attrs ),
		innerBlocks
	);

	block.isValid = isValidBlockContent( blockType, block.attributes, innerHTML );
	block.originalContent = innerHTML;

	block = getMigratedBlock( block, attrs );

	return block;
}

describe( 'coblocks/highlight', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should render with content', () => {
		const block = createBlock( name, { content: 'highlighted content' } );
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'highlighted content' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		const block = createBlock( name );

		expect( serialize( block ) ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should center align text with inline css', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			align: 'center',
		} );
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toMatch( /<p.*style=".*text-align:center/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-background class if any background color is selected', () => {
		const block = createBlock( name, { content: 'highlighted content' } );
		let serializedBlock = '';

		block.attributes.customBackgroundColor = '#000000';
		serializedBlock = serialize( block );
		expect( serializedBlock ).toMatch( /<div.*class=".*has-background/ );
		expect( serializedBlock ).toMatchSnapshot();

		block.attributes.customBackgroundColor = undefined;
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );
		expect( serializedBlock ).toMatch( /<div.*class=".*has-background/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-primary-background-color class if the primary color is selected from the color palette', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			backgroundColor: 'primary',
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<div.*class=".*has-primary-background-color/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply custom background color with inline css', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			customBackgroundColor: '#000000',
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<div.*style=".*background-color:#000000/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-small-font-size class if the small font size is selected', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			fontSize: 'small',
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<p.*class=".*has-small-font-size/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply custom font size with inline css', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			customFontSize: 50,
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<div.*style=".*font-size:50px/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should deprecate v1', () => {
		const postContent = `
<!-- wp:coblocks/highlight -->
<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content">highlighted content</mark></p>
<!-- /wp:coblocks/highlight -->`.trim();

		const parsed = parse( postContent );
		const block = createBlockWithFallback( parsed[ 0 ] );

		expect( block.isValid ).toBe( true );
	} );
} );

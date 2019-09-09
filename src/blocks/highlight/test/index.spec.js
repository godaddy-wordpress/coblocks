/**
 * External dependencies
 */
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom/extend-expect';
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

// Make variables accessible for all tests.
let block;
let blockDOM;
let serializedBlock;

describe( 'coblocks/highlight', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name, { content: 'highlighted content' } );

		// Reset the reused variables.
		blockDOM = undefined;
		serializedBlock = '';
	} );

	it( 'should render with content', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'highlighted content' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should center align text with inline css', () => {
		block.attributes.align = 'center';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight' )
		).toHaveStyle( 'text-align: center' );
	} );

	it( 'should apply has-background class if any background color is selected', () => {
		block.attributes.customBackgroundColor = '#000000';
		block.attributes.backgroundColor = undefined;
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( 'has-background' );

		block.attributes.customBackgroundColor = undefined;
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( 'has-background' );
	} );

	it( 'should apply has-primary-background-color class if the primary color is selected from the color palette', () => {
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( `has-${ block.attributes.backgroundColor }-background-color` );
	} );

	it( 'should apply custom background color with inline css', () => {
		block.attributes.customBackgroundColor = '#123456';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveStyle( `background-color: ${ block.attributes.customBackgroundColor }` );
	} );

	it( 'should apply has-small-font-size class if the small font size is selected', () => {
		block.attributes.fontSize = 'small';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( `has-${ block.attributes.fontSize }-font-size` );
	} );

	it( 'should apply custom font size with inline css', () => {
		block.attributes.customFontSize = 50;
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveStyle( `font-size: ${ block.attributes.customFontSize }px` );
	} );

	it( 'should deprecate v1', () => {
		const postContent = `
			<!-- wp:coblocks/highlight -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->
		`.trim();

		const parsed = parse( postContent );
		const block = createBlockWithFallback( parsed[ 0 ] );

		expect( block.isValid ).toBe( true );
	} );
} );

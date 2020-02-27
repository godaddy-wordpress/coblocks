/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * Internal dependencies.
 */
import '../../../src/extensions/advanced-controls';
import '../../../src/extensions/attributes';
import '../../../src/extensions/button-controls';
import '../../../src/extensions/colors';
import '../../../src/extensions/image-crop';
import '../../../src/extensions/typography';

// Imports used for registerGalleryBlocks().
import { name as stackedName, settings as stackedSettings } from '../../../src/blocks/gallery-stacked';
import { name as collageName, settings as collageSettings } from '../../../src/blocks/gallery-collage/';
import { name as carouselName, settings as carouselSettings } from '../../../src/blocks/gallery-carousel';
import { name as offsetName, settings as offsetSettings } from '../../../src/blocks/gallery-offset';
import { name as masonryName, settings as masonrySettings } from '../../../src/blocks/gallery-masonry';

/**
 * WordPress dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { registerBlockType, unregisterBlockType, createBlock, getBlockTransforms, serialize, parse } from '@wordpress/blocks';

/**
 * Register all gallery blocks to be used for transforms testing.
 *
 * @returns null;
 */
export const registerGalleryBlocks = () => {
	registerBlockType( stackedName, { category: 'common', ...stackedSettings } ); // Register stacked block
	registerBlockType( collageName, { category: 'common', ...collageSettings } ); // Register collage block
	registerBlockType( carouselName, { category: 'common', ...carouselSettings } ); // Register carousel block
	registerBlockType( offsetName, { category: 'common', ...offsetSettings } ); // Register offset block
	registerBlockType( masonryName, { category: 'common', ...masonrySettings } ); // Register masonry block
};

/**
 * A simplified version of the prefix trigger located in the RichText component.
 * See: https://github.com/WordPress/gutenberg/blob/53857f67563eb97025d75c196afa643994f0bbcc/packages/block-editor/src/components/rich-text/index.js#L254-L284
 *
 * @param {String} blockName The registered block name.
 * @param {String} prefix The prefix to trigger the transform.
 * @param {String} content The content of the block when a prefix is found.
 *
 * @returns {Object} The block object.
 */
export const performPrefixTransformation = ( blockName, prefix, content ) => {
	const prefixTransforms = getBlockTransforms( 'from', blockName )
		.filter( ( { type: transformType, prefix: transformPrefix } ) => transformType === 'prefix' && prefix === transformPrefix );

	// Remove prefix trigger from content before performing the transform.
	const blockContent = content.replace( prefix, '' ).trim();
	const block = prefixTransforms[ 0 ].transform( blockContent );

	return block;
};

/**
 * Generate tests for each defined deprecation of a block.
 *
 * @param {String} blockName The registered block name.
 * @param {Object} blockSettings The registered block settings.
 * @param {Object} blockVariations The used attributes and value varitions.
 */
export const testDeprecatedBlockVariations = ( blockName, blockSettings, blockVariations ) => {
	// Make variables accessible for all tests.
	let deprecatedBlock;
	let deprecatedSettings;
	let deprecatedBlockType;

	blockSettings.deprecated.map( ( deprecated, index ) => {
		// Register the deprecated block to get the attributes with filters applied.
		deprecatedSettings = Object.assign(
			{ category: 'common' },
			omit( blockSettings, [ 'attributes', 'save', 'deprecated' ] ),
			{
				attributes: deprecated.attributes,
				save: deprecated.save,
			}
		);
		deprecatedBlockType = registerBlockType( blockName, deprecatedSettings );

		// Unregister the registered block.
		unregisterBlockType( blockName );

		describe( `${blockName} deprecation ${index}`, () => {
			beforeEach( () => {
				// Register the deprecated block.
				deprecatedBlockType = registerBlockType( blockName, deprecatedSettings );

				// Create the block with no attributes.
				deprecatedBlock = createBlock( blockName );
			} );

			afterEach( () => {
				// Unregister the registered block.
				unregisterBlockType( blockName );
			} );

			it( 'should deprecate old version', () => {
				const deprecatedSerialized = serialize( deprecatedBlock );

				// Unregister the deprecated block version.
				unregisterBlockType( blockName );

				// Register the current block version.
				registerBlockType( blockName, { category: 'common', ...blockSettings } );

				const blocks = parse( deprecatedSerialized );

				expect(
					blocks.filter( block => !block.isValid ).map( filterBlockObjectResult )
				).toEqual( [] );
			} );

			Object.keys( deprecatedBlockType.attributes ).map( ( attribute ) => {
				// This test helps expose attributes we need variations for.
				it( `should have variations for attribute.${attribute}`, () => {
					expect( blockVariations.hasOwnProperty( attribute ) ).toBe( true );
				} );

				// Allow each attribute test to pre-set block attributes before testing the attributes deprecation.
				let testVariations;
				let testBaseAttributes = {};

				if ( blockVariations[ attribute ] && Array.isArray( blockVariations[ attribute ] ) ) {
					testVariations = blockVariations[ attribute ];
				} else {
					testVariations = blockVariations[ attribute ].values;
					testBaseAttributes = blockVariations[ attribute ].baseAttributes || {};
				}

				testVariations.map( variation => {
					it( `should support attribute.${attribute} set to '${JSON.stringify( variation )}'`, () => {
						// Allow baseAttributes defined in the test to override deprecated attribute defaults.
						deprecatedBlock.attributes = {
							...deprecatedBlock.attributes,
							...testBaseAttributes,
						};

						// Allow variations to override the baseAttributes defined in the test.
						deprecatedBlock.attributes[ attribute ] = variation;
						const deprecatedSerialized = serialize( deprecatedBlock );

						// Unregister the deprecated block version.
						unregisterBlockType( blockName );

						// Register the current block version.
						registerBlockType( blockName, { category: 'common', ...blockSettings } );

						const blocks = parse( deprecatedSerialized );

						expect(
							blocks.filter( block => !block.isValid ).map( filterBlockObjectResult )
						).toEqual( [] );
					} );
				} );
			} );
		} );
	} )
};

/**
 * Generate tests for each defined deprecation of a block.
 *
 * @param {Object} blockObject The block object returned from parse().
 *
 * @returns {Object} The filtered block object.
 */
const filterBlockObjectResult = ( blockObject ) => {
	const { name, attributes, isValid } = blockObject;
	const validationIssues = blockObject.validationIssues.map( issue => sprintf( ...issue.args ) );
	return { name, attributes, isValid, validationIssues };
};

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
import { registerBlock } from '../../../src/utils/helper';

// Imports used for registerGalleryBlocks().
import * as carouselSettings from '../../../src/blocks/gallery-carousel';
import * as collageSettings from '../../../src/blocks/gallery-collage/';
import * as masonrySettings from '../../../src/blocks/gallery-masonry';
import * as offsetSettings from '../../../src/blocks/gallery-offset';
import * as stackedSettings from '../../../src/blocks/gallery-stacked';

// Imports used for registerFormBlocks().
// Form, Name, Date, Textarea, Phone, Text, Website, Hidden
import { metadata as formMetaData, settings as formBlockSettings } from '../../../src/blocks/form';
import { metadata as formCheckboxMetaData, settings as formCheckboxBlockSettings } from '../../../src/blocks/form/fields/field-checkbox';
import { metadata as formDateMetaData, settings as formDateBlockSettings } from '../../../src/blocks/form/fields/field-date';
import { metadata as formHiddenMetaData, settings as formHiddenBlockSettings } from '../../../src/blocks/form/fields/field-hidden';
import { metadata as formNameMetaData, settings as formNameBlockSettings } from '../../../src/blocks/form/fields/field-name';
import { metadata as formPhoneMetaData, settings as formPhoneBlockSettings } from '../../../src/blocks/form/fields/field-phone';
import { metadata as formRadioMetaData, settings as formRadioBlockSettings } from '../../../src/blocks/form/fields/field-radio';
import { metadata as formSelectMetaData, settings as formSelectBlockSettings } from '../../../src/blocks/form/fields/field-select';
import { metadata as formTextareaMetaData, settings as formTextareaBlockSettings } from '../../../src/blocks/form/fields/field-textarea';
import { metadata as formTextMetaData, settings as formTextBlockSettings } from '../../../src/blocks/form/fields/field-text';
import { metadata as formWebsiteMetaData, settings as formWebsiteBlockSettings } from '../../../src/blocks/form/fields/field-website';

/**
 * WordPress dependencies
 */
import { removeFilter } from '@wordpress/hooks';
import { createBlock, getBlockTransforms, parse, registerBlockType, serialize, unregisterBlockType } from '@wordpress/blocks';

/**
 * Register all gallery blocks to be used for transforms testing.
 *
 */
export const registerGalleryBlocks = () => {
	// const getV2Settings = ( blockMeta, blockSettings ) => {
	// 	const metaClone = { ...blockMeta };
	// 	if ( !! blockSettings?.attributes ) {
	// 		metaClone.attributes = { ...metaClone.attributes, ...blockSettings?.attributes };
	// 	}
	// 	return metaClone;
	// };

	// const v2Carousel = getV2Settings( carouselMeta, carouselSettings );
	// const v2Collage = getV2Settings( collageMeta, collageSettings );
	// const v2Masonry = getV2Settings( masonryMeta, masonrySettings );
	// const v2Offset = getV2Settings( offsetMeta, offsetSettings );
	// const v2Stacked = getV2Settings( stackedMeta, stackedSettings );

	// registerBlockType( carouselMeta, { category: 'common', ...carouselSettings, ...v2Carousel } ); // Register carousel block
	// registerBlockType( collageMeta, { category: 'common', ...collageSettings, ...v2Collage } ); // Register collage block
	// registerBlockType( masonryMeta, { category: 'common', ...masonrySettings, ...v2Masonry } ); // Register masonry block
	// registerBlockType( offsetMeta, { category: 'common', ...offsetSettings, ...v2Offset } ); // Register offset block
	// registerBlockType( stackedMeta, { category: 'common', ...stackedSettings, ...v2Stacked } ); // Register stacked block
	[ carouselSettings, masonrySettings, offsetSettings, stackedSettings, collageSettings ].forEach( ( settings ) => {
		registerBlock( settings );
	} );
};

export const registerFormBlocks = () => {
	// Form, Name, Date, Textarea, Phone, Text, Website, Hidden
	registerBlockType( formMetaData, { category: 'common', ...formBlockSettings } ); // Register form block
	registerBlockType( formNameMetaData, { category: 'common', ...formNameBlockSettings } ); // Register form name block
	registerBlockType( formDateMetaData, { category: 'common', ...formDateBlockSettings } ); // Register form name block
	registerBlockType( formTextareaMetaData, { category: 'common', ...formTextareaBlockSettings } ); // Register form textarea block
	registerBlockType( formPhoneMetaData, { category: 'common', ...formPhoneBlockSettings } ); // Register form phone block
	registerBlockType( formTextMetaData, { category: 'common', ...formTextBlockSettings } ); // Register form text block
	registerBlockType( formWebsiteMetaData, { category: 'common', ...formWebsiteBlockSettings } ); // Register form website block
	registerBlockType( formHiddenMetaData, { category: 'common', ...formHiddenBlockSettings } ); // Register form hidden block

	// Select, Checkbox, Radio
	registerBlockType( formSelectMetaData, { category: 'common', ...formSelectBlockSettings } ); // Register form name block
	registerBlockType( formCheckboxMetaData, { category: 'common', ...formCheckboxBlockSettings } ); // Register form name block
	registerBlockType( formRadioMetaData, { category: 'common', ...formRadioBlockSettings } ); // Register form name block
};

/**
 * A simplified version of the prefix trigger located in the RichText component.
 * See: https://github.com/WordPress/gutenberg/blob/53857f67563eb97025d75c196afa643994f0bbcc/packages/block-editor/src/components/rich-text/index.js#L254-L284
 *
 * @param {string} blockName The registered block name.
 * @param {string} prefix    The prefix to trigger the transform.
 * @param {string} content   The content of the block when a prefix is found.
 * @return {Object} The block object.
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
 * @param {string} blockName       The registered block name.
 * @param {Object} blockSettings   The registered block settings.
 * @param {Object} blockVariations The used attributes and value varitions.
 */
export const testDeprecatedBlockVariations = ( blockName, blockSettings, blockVariations ) => {
	// Make variables accessible for all tests.
	let deprecatedBlock;
	let deprecatedSettings;
	let deprecatedBlockType;

	removeFilter( 'blocks.registerBlockType', 'core/lock/addAttribute' );

	blockSettings.deprecated.forEach( ( deprecated, index ) => {
		// Register the deprecated block to get the attributes with filters applied.
		deprecatedSettings = Object.assign(
			{ category: 'common' },
			omit( blockSettings, [ 'attributes', 'save', 'deprecated', 'supports' ] ),
			{
				attributes: deprecated.attributes,
				save: deprecated.save,
			}
		);
		deprecatedBlockType = registerBlockType( blockName, deprecatedSettings );

		// Unregister the registered block.
		unregisterBlockType( blockName );

		describe( `${ blockName } deprecation ${ index }`, () => {
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
					blocks.filter( ( block ) => ! block.isValid ).map( filterBlockObjectResult )
				).toEqual( [] );
			} );

			Object.keys( deprecatedBlockType?.attributes ?? {} ).forEach( ( attribute ) => {
				// This test helps expose attributes we need variations for.
				it( `should have variations for attribute.${ attribute }`, () => {
					expect( blockVariations.hasOwnProperty( attribute ) ).toBe( true );
				} );

				// Allow each attribute test to pre-set block attributes before testing the attributes deprecation.
				let testVariations;
				let testBaseAttributes = {};

				if ( blockVariations[ attribute ] && Array.isArray( blockVariations[ attribute ] ) ) {
					testVariations = blockVariations[ attribute ];
				} else {
					testVariations = blockVariations[ attribute ]?.values || [];
					testBaseAttributes = blockVariations[ attribute ]?.baseAttributes || {};
				}

				testVariations.forEach( ( variation ) => {
					it( `should support attribute.${ attribute } set to '${ JSON.stringify( variation ) }'`, () => {
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
							blocks.filter( ( block ) => ! block.isValid ).map( filterBlockObjectResult )
						).toEqual( [] );
					} );
				} );
			} );
		} );
	} );
};

/**
 * Generate tests for each defined deprecation of a block.
 *
 * @param {Object} blockObject The block object returned from parse().
 * @return {Object} The filtered block object.
 */
export const filterBlockObjectResult = ( blockObject ) => {
	const { name, attributes, isValid } = blockObject;
	const validationIssues = blockObject.validationIssues.map( ( issue ) => issue.args );
	return { attributes, isValid, name, validationIssues };
};

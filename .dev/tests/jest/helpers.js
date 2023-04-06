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
import { metadata as carouselMeta, name as carouselName, settings as carouselSettings } from '../../../src/blocks/gallery-carousel';
import { metadata as collageMeta, name as collageName, settings as collageSettings } from '../../../src/blocks/gallery-collage/';
import { metadata as masonryMeta, name as masonryName, settings as masonrySettings } from '../../../src/blocks/gallery-masonry';
import { metadata as offsetMeta, name as offsetName, settings as offsetSettings } from '../../../src/blocks/gallery-offset';
import { metadata as stackedMeta, name as stackedName, settings as stackedSettings } from '../../../src/blocks/gallery-stacked';

// Imports used for registerFormBlocks().
// Form, Name, Date, Textarea, Phone, Text, Website, Hidden
import { name as formBlockName, settings as formBlockSettings } from '../../../src/blocks/form';
import { name as formCheckboxBlockName, settings as formCheckboxBlockSettings } from '../../../src/blocks/form/fields/field-checkbox';
import { name as formDateBlockName, settings as formDateBlockSettings } from '../../../src/blocks/form/fields/field-date';
import { name as formHiddenBlockName, settings as formHiddenBlockSettings } from '../../../src/blocks/form/fields/field-hidden';
import { name as formNameBlockName, settings as formNameBlockSettings } from '../../../src/blocks/form/fields/field-name';
import { name as formPhoneBlockName, settings as formPhoneBlockSettings } from '../../../src/blocks/form/fields/field-phone';
import { name as formRadioBlockName, settings as formRadioBlockSettings } from '../../../src/blocks/form/fields/field-radio';
import { name as formSelectBlockName, settings as formSelectBlockSettings } from '../../../src/blocks/form/fields/field-select';
import { name as formTextareaBlockName, settings as formTextareaBlockSettings } from '../../../src/blocks/form/fields/field-textarea';
import { name as formTextBlockName, settings as formTextBlockSettings } from '../../../src/blocks/form/fields/field-text';
import { name as formWebsiteBlockName, settings as formWebsiteBlockSettings } from '../../../src/blocks/form/fields/field-website';

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
	const getV2Settings = ( blockMeta, blockSettings ) => {
		const metaClone = { ...blockMeta };
		if ( !! blockSettings?.attributes ) {
			metaClone.attributes = { ...metaClone.attributes, ...blockSettings?.attributes };
		}
		return metaClone;
	};

	const v2Carousel = stackedMeta?.apiVersion === 2 ? getV2Settings( carouselMeta, carouselSettings ) : {};
	const v2Collage = stackedMeta?.apiVersion === 2 ? getV2Settings( collageMeta, collageSettings ) : {};
	const v2Masonry = stackedMeta?.apiVersion === 2 ? getV2Settings( masonryMeta, masonrySettings ) : {};
	const v2Offset = stackedMeta?.apiVersion === 2 ? getV2Settings( offsetMeta, offsetSettings ) : {};
	const v2Stacked = stackedMeta?.apiVersion === 2 ? getV2Settings( stackedMeta, stackedSettings ) : {};

	registerBlockType( carouselName, { category: 'common', ...carouselSettings, ...v2Carousel } ); // Register carousel block
	registerBlockType( collageName, { category: 'common', ...collageSettings, ...v2Collage } ); // Register collage block
	registerBlockType( masonryName, { category: 'common', ...masonrySettings, ...v2Masonry } ); // Register masonry block
	registerBlockType( offsetName, { category: 'common', ...offsetSettings, ...v2Offset } ); // Register offset block
	registerBlockType( stackedName, { category: 'common', ...stackedSettings, ...v2Stacked } ); // Register stacked block
};

export const registerFormBlocks = () => {
	// Form, Name, Date, Textarea, Phone, Text, Website, Hidden
	registerBlockType( formBlockName, { category: 'common', ...formBlockSettings } ); // Register form block
	registerBlockType( formNameBlockName, { category: 'common', ...formNameBlockSettings } ); // Register form name block
	registerBlockType( formDateBlockName, { category: 'common', ...formDateBlockSettings } ); // Register form name block
	registerBlockType( formTextareaBlockName, { category: 'common', ...formTextareaBlockSettings } ); // Register form textarea block
	registerBlockType( formPhoneBlockName, { category: 'common', ...formPhoneBlockSettings } ); // Register form phone block
	registerBlockType( formTextBlockName, { category: 'common', ...formTextBlockSettings } ); // Register form text block
	registerBlockType( formWebsiteBlockName, { category: 'common', ...formWebsiteBlockSettings } ); // Register form website block
	registerBlockType( formHiddenBlockName, { category: 'common', ...formHiddenBlockSettings } ); // Register form hidden block

	// Select, Checkbox, Radio
	registerBlockType( formSelectBlockName, { category: 'common', ...formSelectBlockSettings } ); // Register form name block
	registerBlockType( formCheckboxBlockName, { category: 'common', ...formCheckboxBlockSettings } ); // Register form name block
	registerBlockType( formRadioBlockName, { category: 'common', ...formRadioBlockSettings } ); // Register form name block
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
			omit( blockSettings, [ 'attributes', 'save', 'deprecated' ] ),
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

			Object.keys( deprecatedBlockType.attributes ).forEach( ( attribute ) => {
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

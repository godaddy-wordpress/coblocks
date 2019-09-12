/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { omit } from 'lodash';
import { registerBlockType, unregisterBlockType, createBlock, serialize, parse } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

const variations = {
	layout: [],
	fullscreen: [],
	paddingTop: [],
	paddingRight: [],
	paddingBottom: [],
	paddingLeft: [],
	paddingTopTablet: [],
	paddingRightTablet: [],
	paddingBottomTablet: [],
	paddingLeftTablet: [],
	paddingTopMobile: [],
	paddingRightMobile: [],
	paddingBottomMobile: [],
	paddingLeftMobile: [],
	paddingUnit: [],
	paddingSize: [],
	paddingSyncUnits: [],
	paddingSyncUnitsTablet: [],
	paddingSyncUnitsMobile: [],
	marginTop: [],
	marginRight: [],
	marginBottom: [],
	marginLeft: [],
	marginTopTablet: [],
	marginRightTablet: [],
	marginBottomTablet: [],
	marginLeftTablet: [],
	marginTopMobile: [],
	marginRightMobile: [],
	marginBottomMobile: [],
	marginLeftMobile: [],
	marginUnit: [],
	marginSize: [],
	marginSyncUnits: [],
	marginSyncUnitsTablet: [],
	marginSyncUnitsMobile: [],
	hasMarginControl: [],
	hasAlignmentControls: [],
	hasStackedControl: [],
	backgroundType: [],
	backgroundImg: [],
	backgroundPosition: [],
	backgroundRepeat: [],
	backgroundSize: [],
	backgroundOverlay: [],
	backgroundColor: [],
	customBackgroundColor: [],
	hasParallax: [],
	focalPoint: [],
	videoMuted: [],
	videoLoop: [],
	openPopover: [],
	height: [],
	heightTablet: [],
	heightMobile: [],
	syncHeight: [],
	align: [],
	contentAlign: [ undefined, 'left', 'center', 'right' ],
	textColor: [ undefined, 'primary' ],
	customTextColor: [ undefined, '#123456' ],
	maxWidth: [ 750 ],
	saveCoBlocksMeta: [],
};

settings.deprecated.map( ( deprecated, index ) => {
	describe( `coblocks/hero deprecation ${ index }`, () => {
		// Make variables accessible for all tests.
		let deprecatedBlock;

		beforeEach( () => {
			unregisterBlockType( name );

			// Register the deprecated block.
			const deprecatedSettings = Object.assign(
				{}, omit( settings, [ 'attributes', 'save', 'deprecated' ] ),
				{
					attributes: deprecated.attributes,
					save: deprecated.save,
				}
			);
			registerBlockType( name, { category: 'common', ...deprecatedSettings } );

			// Create the block with the minimum attributes.
			deprecatedBlock = createBlock( name );
		} );

		it( 'should deprecate old version', () => {
			const deprecatedSerialized = serialize( deprecatedBlock );

			// Unregister the deprecated block version.
			unregisterBlockType( name );

			// Register the current block version.
			registerBlockType( name, { category: 'common', ...settings } );

			const blocks = parse( deprecatedSerialized );

			for ( let i = 0; i < blocks.length; i++ ) {
				expect( blocks[ i ].isValid ).toBe( true );
			}
		} );

		Object.keys( deprecated.attributes ).map( ( attribute ) => {
			variations[ attribute ].map( variation => {
				it( `should support attribute.${ attribute } set to '${ variation }'`, () => {
					deprecatedBlock.attributes[ attribute ] = variation;
					const deprecatedSerialized = serialize( deprecatedBlock );

					// Unregister the deprecated block version.
					unregisterBlockType( name );

					// Register the current block version.
					registerBlockType( name, { category: 'common', ...settings } );

					const blocks = parse( deprecatedSerialized );

					for ( let i = 0; i < blocks.length; i++ ) {
						expect( blocks[ i ].isValid ).toBe( true );
					}
				} );
			} );
		} );
	} );
} );

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
	layout: [ 'top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right' ],
	fullscreen: [ true, false ],
	paddingTop: [ 0, 100 ],
	paddingRight: [ 0, 100 ],
	paddingBottom: [ 0, 100 ],
	paddingLeft: [ 0, 100 ],
	paddingTopTablet: [ 0, 100 ],
	paddingRightTablet: [ 0, 100 ],
	paddingBottomTablet: [ 0, 100 ],
	paddingLeftTablet: [ 0, 100 ],
	paddingTopMobile: [ 0, 100 ],
	paddingRightMobile: [ 0, 100 ],
	paddingBottomMobile: [ 0, 100 ],
	paddingLeftMobile: [ 0, 100 ],
	paddingUnit: [ 'px', 'em', '%' ],
	paddingSize: [ 'no', 'small', 'medium', 'large', 'advanced' ],
	paddingSyncUnits: [ true, false ],
	paddingSyncUnitsTablet: [ true, false ],
	paddingSyncUnitsMobile: [ true, false ],
	marginTop: [ 0, 100 ],
	marginRight: [ 0, 100 ],
	marginBottom: [ 0, 100 ],
	marginLeft: [ 0, 100 ],
	marginTopTablet: [ 0, 100 ],
	marginRightTablet: [ 0, 100 ],
	marginBottomTablet: [ 0, 100 ],
	marginLeftTablet: [ 0, 100 ],
	marginTopMobile: [ 0, 100 ],
	marginRightMobile: [ 0, 100 ],
	marginBottomMobile: [ 0, 100 ],
	marginLeftMobile: [ 0, 100 ],
	marginUnit: [ 'px', 'em', '%' ],
	marginSize: [ 'no', 'small', 'medium', 'large', 'advanced' ],
	marginSyncUnits: [ true, false ],
	marginSyncUnitsTablet: [ true, false ],
	marginSyncUnitsMobile: [ true, false ],
	hasMarginControl: [ true, false ],
	hasAlignmentControls: [ true, false ],
	hasStackedControl: [ true, false ],
	backgroundType: [ undefined, '', 'image', 'video' ],
	backgroundImg: [ undefined, '', 'https://website.com/wp-content/uploads/1234/56/image.jpg', 'https://website.com/wp-content/uploads/1234/56/video.mp4' ],
	backgroundPosition: [ undefined, '' ],
	backgroundRepeat: [ 'no-repeat', 'repeat', 'repeat-x', 'repeat-y' ],
	backgroundSize: [ 'cover', 'contain' ],
	backgroundOverlay: [ 0, 100 ],
	backgroundColor: [ undefined, 'primary' ],
	customBackgroundColor: [ '#123456' ],
	hasParallax: [ true, false ],
	focalPoint: [ undefined, { x: 0, y: 0 }, { x: 0.33663366336633666, y: 0.8335193452380952 } ],
	videoMuted: [ true, false ],
	videoLoop: [ true, false ],
	openPopover: [ true, false ],
	height: [ 0, 1000 ],
	heightTablet: [ 0, 1000 ],
	heightMobile: [ 0, 1000 ],
	syncHeight: [ true, false ],
	align: [ '', 'wide', 'full' ],
	contentAlign: [ undefined, 'left', 'center', 'right' ],
	textColor: [ undefined, 'primary' ],
	customTextColor: [ undefined, '#123456' ],
	maxWidth: [ 750 ],
	saveCoBlocksMeta: [ true, false ],
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

			expect(
				blocks.every( block => block.isValid )
			).toBe( true );
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

					expect(
						blocks.every( block => block.isValid )
					).toBe( true );
				} );
			} );
		} );
	} );
} );

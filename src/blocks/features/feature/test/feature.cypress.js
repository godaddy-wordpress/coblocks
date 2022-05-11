/**
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Feature Block', function() {
	/**
	 * Setup feature data
	 */
	const featureData = {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	 * Test that we can add a feature block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test feature block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/features', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/feature' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-feature' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a feature block to the content, adjust
	 * colors and are able to successfully save the block without errors.
	 */
	it( 'Test feature block saves with color values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB } = featureData;
		helpers.addBlockToPost( 'coblocks/features', true );

		cy.get( '.wp-block-coblocks-feature' ).first().click( { force: true } );

		helpers.setColorPanelSetting( 'background color', backgroundColor );
		helpers.setColorPanelSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/feature' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-feature' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-feature__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );

	/**
	 * Test the feature block saves with custom classes
	 * Use one column to avoid confusion in the DOM.
	 */
	it( 'Test the feature block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/features', true );

		// Workaround for the advanced panel not loading consistently.
		cy.get( '.editor-post-title' ).click();

		helpers.addCustomBlockClass( 'my-custom-class', 'feature' );
		cy.get( '.wp-block-coblocks-feature' ).last().should( 'have.class', 'my-custom-class' );

		helpers.checkForBlockErrors( 'coblocks/feature' );
	} );
} );

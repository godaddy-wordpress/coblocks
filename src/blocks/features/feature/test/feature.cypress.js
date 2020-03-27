/*
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

		helpers.setColorSetting( 'background color', backgroundColor );
		helpers.setColorSetting( 'text color', textColor );

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

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"][type="number"]' ).click().clear().type( 1 );

		cy.get( '.wp-block-coblocks-feature' ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).contains( /feature settings/i ).click(); //close feature settings panel

		helpers.addCustomBlockClass( 'my-custom-class', 'feature' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/feature' );

		cy.get( '.wp-block-coblocks-feature' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-feature' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

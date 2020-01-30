/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Feature Block', function() {
	beforeEach( function() {
		helpers.addCoBlocksBlockToPage( true, 'features' );
	} );

	/**
	   * Test that we can add a feature block to the content, not alter
	   * any settings, and are able to successfully save the block without errors.
	   */
	it( 'Test feature block saves with empty values.', function() {
		cy.get( '.wp-block-coblocks-feature' ).should( 'exist' );
		helpers.checkForBlockErrors( 'feature' );
	} );

	/**
	   * Test that we can add a feature block to the content, adjust
	   * colors and are able to successfully save the block without errors.
	   */
	it( 'Test feature block saves with color values set.', function() {
		cy.get( '.wp-block-coblocks-feature' ).first().click( { force: true } );

		helpers.setColorSetting( 'background color', '#ff0000' );
		helpers.setColorSetting( 'text color', '#ffffff' );

		cy.get( '.wp-block-coblocks-feature' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-feature__inner' )
			.should( 'have.css', 'background-color', 'rgb(255, 0, 0)' )
			.should( 'have.css', 'color', 'rgb(255, 255, 255)' );

		helpers.checkForBlockErrors( 'feature' );
	} );

	/**
   * Test the feature block saves with custom classes
   * Use one column to avoid confusion in the DOM.
   */
	it( 'Test the feature block custom classes.', function() {
		cy.get( '.edit-post-sidebar' ).contains( /feature settings/i ).click(); //close feature settings panel

		helpers.addCustomBlockClass( 'my-custom-class', 'feature' );

		cy.get( '.wp-block-coblocks-feature' )
			.should( 'have.class', 'my-custom-class' );

		helpers.checkForBlockErrors( 'feature' );
	} );

	it( 'Matches snapshot', function() {
		helpers.savePage();

		helpers.viewPage().then( () => {
			Cypress.$( '#wpadminbar' ).hide();
			cy.get( '.hentry' ).toMatchImageSnapshot();
		} );
	} );
} );

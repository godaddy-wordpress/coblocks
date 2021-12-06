/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Click to Tweet Block', function() {
	/**
	 * Test that we can save a Click to Tweet block with empty values
	 */
	it( 'Test Click to Tweet block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/click-to-tweet', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/click-to-tweet' );

		helpers.viewPage();

		helpers.editPage();
	} );

	/**
	 * Test that we can save a Click to Tweet block with custom data
	 */
	it( 'Test Click to Tweet block saves with custom data.', function() {
		helpers.addBlockToPost( 'coblocks/click-to-tweet', true );

		cy.get( '.wp-block-coblocks-click-to-tweet' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-click-to-tweet__via' ).type( 'TestUsername' );
		cy.get( '.wp-block-coblocks-click-to-tweet__text' ).focus().type( 'Some custom data here.' );
		cy.get( '.wp-block-coblocks-click-to-tweet__twitter-btn' ).focus().type( 'Click to tweet' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/click-to-tweet' );

		cy.get( '.wp-block-coblocks-click-to-tweet' )
			.should( 'exist' );

		cy.get( '.wp-block-coblocks-click-to-tweet__text' )
			.contains( 'Some custom data here.' );

		cy.get( '.wp-block-coblocks-click-to-tweet__twitter-btn' )
			.contains( 'Click to tweet' );

		helpers.viewPage();

		helpers.editPage();
	} );

	/**
	 * Test the text sizes change as expected
	 */
	it( 'Test the text sizes change as expected.', function() {
		helpers.addBlockToPost( 'coblocks/click-to-tweet', true );

		cy.get( '.wp-block-coblocks-click-to-tweet' ).click( { force: true } );
		cy.get( '.wp-block-coblocks-click-to-tweet__text' ).focus().type( 'Some custom data here.' );

		cy.get( '#downshift-1-toggle-button' ).click();
		cy.get( '#downshift-1-menu li' ).contains( 'Small' ).click();
		cy.get( '#downshift-1-toggle-button' ).contains( 'Small' );
		cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /17px/ );

		cy.get( '#downshift-1-toggle-button' ).click();
		cy.get( '#downshift-1-menu li' ).contains( 'Medium' ).click();
		cy.get( '#downshift-1-toggle-button' ).contains( 'Medium' );
		cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /21px/ );

		cy.get( '#downshift-1-toggle-button' ).click();
		cy.get( '#downshift-1-menu li' ).contains( 'Large' ).click();
		cy.get( '#downshift-1-toggle-button' ).contains( 'Large' );
		cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /24px/ );

		cy.get( '#downshift-1-toggle-button' ).click();
		cy.get( '#downshift-1-menu li' ).contains( 'Huge' ).click();
		cy.get( '#downshift-1-toggle-button' ).contains( 'Huge' );
		cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /30px/ );

		cy.get( '#downshift-1-toggle-button' ).click();
		cy.get( '#downshift-1-menu li' ).contains( 'Custom' ).click();
		cy.get( '.components-input-control__container input[aria-label="Custom"]' ).type( '5' );
		cy.get( '#downshift-1-toggle-button' ).contains( 'Custom' );
		cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /5px/ );

		cy.get( '#downshift-1-toggle-button' ).click();
		cy.get( '#downshift-1-menu li' ).contains( 'Default' ).click();
		cy.get( '#downshift-1-toggle-button' ).contains( 'Default' );

		// Test the reset button
		cy.get( '#downshift-1-toggle-button' ).click();
		cy.get( '#downshift-1-menu li' ).contains( 'Huge' ).click();
		cy.get( '#downshift-1-toggle-button' ).contains( 'Huge' );
		cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /30px/ );
		cy.get( '.components-font-size-picker__controls button' ).contains( 'Reset' ).click();
		cy.get( '#downshift-1-toggle-button' ).contains( 'Default' );
	} );
} );

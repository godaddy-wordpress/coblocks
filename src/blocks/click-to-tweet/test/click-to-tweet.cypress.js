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
		const downshiftToggleButton = '#downshift-0-toggle-button, #downshift-1-toggle-button';
		const downshiftMenuLi = '#downshift-0-menu li, #downshift-1-menu li';

		helpers.addBlockToPost( 'coblocks/click-to-tweet', true );

		cy.get( '.components-font-size-picker' ).then( () => {
			// WP 5.9
			if ( Cypress.$( '.components-toggle-group-control-option' ).length > 0 ) {
				cy.get( '.wp-block-coblocks-click-to-tweet' ).click( { force: true } );
				cy.get( '.wp-block-coblocks-click-to-tweet__text' ).focus().type( 'Some custom data here.' );

				cy.get( '#toggle-group-control-0, #toggle-group-control-1' ).find( '[data-value="17px"]' ).click();
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /17px/ );

				cy.get( '#toggle-group-control-0, #toggle-group-control-1' ).find( '[data-value="24px"]' ).click();
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /24px/ );
			// < WP 5.9
			} else {
				cy.get( '.wp-block-coblocks-click-to-tweet' ).click( { force: true } );
				cy.get( '.wp-block-coblocks-click-to-tweet__text' ).focus().type( 'Some custom data here.' );

				cy.get( downshiftToggleButton ).click();
				cy.get( downshiftMenuLi ).contains( 'Small' ).click();
				cy.get( downshiftToggleButton ).contains( 'Small' );
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /17px/ );

				cy.get( downshiftToggleButton ).click();
				cy.get( downshiftMenuLi ).contains( 'Medium' ).click();
				cy.get( downshiftToggleButton ).contains( 'Medium' );
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /21px/ );

				cy.get( downshiftToggleButton ).click();
				cy.get( downshiftMenuLi ).contains( 'Large' ).click();
				cy.get( downshiftToggleButton ).contains( 'Large' );
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /24px/ );

				cy.get( downshiftToggleButton ).click();
				cy.get( downshiftMenuLi ).contains( 'Huge' ).click();
				cy.get( downshiftToggleButton ).contains( 'Huge' );
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /30px/ );

				cy.get( downshiftToggleButton ).click();
				cy.get( downshiftMenuLi ).contains( 'Custom' ).click();
				cy.get( '.components-input-control__container input[aria-label="Custom"]' ).type( '5' );
				cy.get( downshiftToggleButton ).contains( 'Custom' );
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /5px/ );

				cy.get( downshiftToggleButton ).click();
				cy.get( downshiftMenuLi ).contains( 'Default' ).click();
				cy.get( downshiftToggleButton ).contains( 'Default' );

				// Test the reset button
				cy.get( downshiftToggleButton ).click();
				cy.get( downshiftMenuLi ).contains( 'Huge' ).click();
				cy.get( downshiftToggleButton ).contains( 'Huge' );
				cy.get( '.wp-block-coblocks-click-to-tweet .block-editor-rich-text__editable' ).should( 'have.css', 'font-size' ).and( 'match', /30px/ );
				cy.get( '.components-font-size-picker__controls button' ).contains( 'Reset' ).click();
				cy.get( downshiftToggleButton ).contains( 'Default' );
			}
		} );
	} );
} );

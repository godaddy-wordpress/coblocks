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

		cy.get( '.components-toggle-group-control-option, .components-toggle-group-control-option-base' ).then( ( elems ) => {
			let dataValue;
			Array.from( elems ).forEach( ( elem ) => {
				dataValue = Cypress.$( elem ).css( 'font-size' );
				cy.get( elem ).focus().click();
				// We do not test the value due to theme setting specified fonts sizes.
				// Instead we test that the value has changed from original.
				cy.get( '.wp-block-coblocks-click-to-tweet__text' ).should( 'not.have.css', 'font-size', dataValue );
			} );
		} );
	} );
} );

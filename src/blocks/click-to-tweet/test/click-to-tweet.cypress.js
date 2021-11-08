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

		helpers.checkForBlockErrors( 'coblocks/click-to-tweet' );
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

		helpers.checkForBlockErrors( 'coblocks/click-to-tweet' );

		cy.get( '.wp-block-coblocks-click-to-tweet' )
			.should( 'exist' );

		cy.get( '.wp-block-coblocks-click-to-tweet__text' )
			.contains( 'Some custom data here.' );

		cy.get( '.wp-block-coblocks-click-to-tweet__twitter-btn' )
			.contains( 'Click to tweet' );
	} );
} );

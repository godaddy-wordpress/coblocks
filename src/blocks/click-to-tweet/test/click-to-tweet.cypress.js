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

		cy.get( '.wp-block-coblocks-click-to-tweet' )
			.should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can save a Click to Tweet block with custom data
	 */
	it( 'Test Click to Tweet block saves with custom data.', function() {
		helpers.addBlockToPost( 'coblocks/click-to-tweet', true );

		cy.get( '.wp-block-coblocks-click-to-tweet' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-click-to-tweet__via' ).type( 'TestUsername' );
		cy.get( '.wp-block-coblocks-click-to-tweet__text' ).type( 'Some custom data here.' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/click-to-tweet' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-click-to-tweet' )
			.should( 'exist' );

		cy.get( '.wp-block-coblocks-click-to-tweet__text' )
			.contains( 'Some custom data here.' );

		cy.get( '.wp-block-coblocks-click-to-tweet__twitter-btn' )
			.should( 'have.attr', 'href' )
			.and( 'match', /Some\%20custom%20data%20here/ )
			.and( 'match', /&via\=TestUsername/ );

		helpers.editPage();
	} );
} );

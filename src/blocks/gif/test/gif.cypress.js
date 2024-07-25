/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gif Block', function() {
	// Setup Gif data.
	const gifText = 'Alt text here';

	/**
	 * Test that we can add a gif block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test gif block saves without content.', function() {
		helpers.addBlockToPost( 'coblocks/gif', true );

		cy.get( '.wp-block-coblocks-gif' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gif' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gif' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a gif block to the content, choose a Gif
	 * set alt and are able to successfully save the block without errors.
	 */
	it( 'Test gif block saves with img and alt text.', function() {
		helpers.addBlockToPost( 'coblocks/gif', true );

		cy.get( '.wp-block-coblocks-gif' ).should( 'exist' );

		cy.get( 'input[placeholder="Search for gifs"]' ).type( 'gifs' ); //wait for img to attach to dom.

		cy.get( '.wp-block-coblocks-gif__results' ).find( 'img' ).first().click( { force: true } );

		cy.get( '.wp-block-coblocks-gif' ).find( 'img' ).should( 'have.length', 1 );

		cy.get( helpers.sidebarClass() ).contains( /Alt text/ ).parent().find( 'textarea' ).type( gifText );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gif' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gif' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gif' ).find( 'img' ).should( 'have.length', 1 );
		cy.get( '.wp-block-coblocks-gif' ).find( `img[alt="${ gifText }"]` ).should( 'exist' );

		helpers.editPage();
	} );
} );

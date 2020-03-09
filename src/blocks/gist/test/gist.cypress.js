/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gist Block', function() {
	// setup gist block data.
	const gistUrl = 'https://gist.github.com/AnthonyLedesma/33ad1a8cd86da3b6bddbdefa432cb51d';

	/**
	 * Test that we can add a gist block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test gist block saves with color values set.', function() {
		helpers.addBlockToPost( 'coblocks/gist', true );

		cy.get( '.wp-block-coblocks-gist' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gist' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gist' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a gist block to the content, add a Gist
	 * URL and save without any errors.
	 */
	it( 'Test gist block saves with url.', function() {
		helpers.addBlockToPost( 'coblocks/gist', true );

		cy.get( '.wp-block-coblocks-gist textarea' ).invoke( 'val', gistUrl ).type( '{enter}' );

		cy.get( '.wp-block-coblocks-gist .gist' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-gist' ).find( '.gist-file' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gist' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gist' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the Gist block saves with custom classes
	 */
	it( 'Test gist block saves with custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/gist', true );

		cy.get( '.wp-block-coblocks-gist textarea' ).invoke( 'val', gistUrl ).type( '{enter}' );

		cy.get( '.wp-block-coblocks-gist .gist' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-gist' ).click( { force: true } );

		helpers.addCustomBlockClass( 'my-custom-class', 'gist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gist' );

		cy.get( '.wp-block-coblocks-gist' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gist' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

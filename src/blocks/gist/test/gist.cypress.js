/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';
/*
* The Gist block has a typical user interaction with copy and paste which is not supported by Cypress.
* Here we dissect the test Gist URL by extracting the final character.
* Cypress events should be chained as `.invoke( 'val', gistUrlVal ).type( gistUrlType );`
*/
describe( 'Test CoBlocks Gist Block', function() {
	const gistUrlVal = 'https://gist.github.com/AnthonyLedesma/7d0352e8bc50a8a009c2b930f23d110d#file-gistblocktest-tex';
	const gistUrlType = 't';

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

		cy.get( '.wp-block-coblocks-gist textarea' ).invoke( 'val', gistUrlVal ).type( gistUrlType );

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

		cy.get( '.wp-block-coblocks-gist textarea' ).invoke( 'val', gistUrlVal ).type( gistUrlType );

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

	it( 'Test two gists in the edit page should render properly', function() {
		helpers.addBlockToPost( 'coblocks/gist', true );

		cy.get( '.wp-block-coblocks-gist textarea' ).invoke( 'val', gistUrlVal ).type( gistUrlType );

		helpers.addBlockToPost( 'coblocks/gist' );

		cy.get( '.wp-block-coblocks-gist textarea' ).invoke( 'val', gistUrlVal ).type( gistUrlType );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gist' );

		cy.get( '.wp-block-coblocks-gist' ).find( '.gist-file' ).should( 'have.length', 2 );
	} );
} );

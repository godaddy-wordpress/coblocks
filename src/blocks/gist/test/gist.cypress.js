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
	/**
	 * Test that we can add a core/embed block variation to the content, add a Gist
	 * URL and save without any errors.
	 */
	it( 'Test gist block saves with url.', function() {
		helpers.addBlockToPost( 'core/embed', true );

		cy.get( '.wp-block-embed .components-placeholder__input' ).type( 'https://gist.github.com/jrtashjian/98c1fcfd0e9f9ed59d710ccf7ef4291c#file-block-variation-js' );
		cy.get( '.wp-block-embed .components-button.is-primary' ).click();

		cy.get( '.components-sandbox' ).should( 'exist' );

		helpers.checkForBlockErrors( 'core/embed' );
	} );
} );

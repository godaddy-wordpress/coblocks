/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Alert Block', function() {
	let postId;
	before( () => {
		cy.fixture( `../.dev/tests/cypress/fixtures/${ Cypress.spec.name }.json` )
			.then( ( output ) => {
				postId = output[ Cypress.spec.name ] ?? '';
			} );
	} );

	it( 'Test Alert block migrates into core blocks.', function() {
		helpers.goTo( `/wp-admin/post.php?post=${ postId }&action=edit` );

		helpers.openBlockNavigator();
		cy.get( '[data-type="core/paragraph"]' ).should( 'have.length', 3 );
		helpers.checkForBlockErrors( 'core/paragraph' );
	} );
} );

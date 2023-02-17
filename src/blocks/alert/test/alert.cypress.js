/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Alert Block', function() {
	let postId;
	before( () => {
		cy.fixture( '../.dev/tests/cypress/fixtures/github-actions-output.json' )
			.then( ( output ) => {
				postId = output[ Cypress.spec.name ] ?? '';
			} );
	} );

	it( 'Test posts block column and post count controls.', function() {
		helpers.goTo( `/wp-admin/post.php?post=${ postId }&action=edit` );

		helpers.openBlockNavigator();
		cy.get( '[data-type="core/paragraph"]' ).should( 'have.length', 1 );
	} );
} );

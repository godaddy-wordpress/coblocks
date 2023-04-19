/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Author Block', function() {
	let postId;
	before( () => {
		cy.fixture( `../.dev/tests/cypress/fixtures/${ Cypress.spec.name }.json` )
			.then( ( output ) => {
				postId = output[ Cypress.spec.name ] ?? '';
			} );
	} );

	it( 'Test Author block migrates into core blocks.', function() {
		helpers.goTo( `/wp-admin/post.php?post=${ postId }&action=edit` );

		// Two blocks
		cy.get( '[data-type="core/columns"]' ).should( 'have.length', 2 );

		// Two blocks two columns each four total.
		cy.get( '[data-type="core/column"]' ).should( 'have.length', 4 );

		// Two blocks two images.
		cy.get( '[data-type="core/image"]' ).should( 'have.length', 2 );

		// Two blocks two core/buttons with two core/button inside.
		cy.get( '[data-type="core/buttons"]' ).should( 'have.length', 2 );
		// Two blocks two buttons.
		cy.get( '[data-type="core/button"]' ).should( 'have.length', 2 );

		// Two blocks two headings two bios.
		cy.get( '[data-type="core/paragraph"]' ).should( 'have.length', 4 );

		// Should be no error.
		helpers.checkForBlockErrors( 'core/columns' );
	} );
} );

/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gif Block', function() {
	/**
	 * Test that we can add a Gif block that migrates into the core/image block.
	 */
	it( 'renders a paragraph block', function() {
		const config = Cypress.config();
		helpers.goTo( `/wp-admin/post.php?post=${ config.migrationPostList.highlight }&action=edit` );

		helpers.openBlockNavigator();

		cy.get( '[data-type="core/image"]' ).should( 'have.length', 1 );
	} );
} );

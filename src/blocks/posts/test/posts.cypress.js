/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Posts Block', function() {
	/**
	 * Test that we can add an Posts block that migrates into the core/query block or core/rss block respectively.
	 */
	it( 'Test posts block saves with empty values.', function() {
		const config = Cypress.config();
		helpers.goTo( `/wp-admin/post.php?post=${ config.migrationPostList.posts }&action=edit` );
		helpers.openBlockNavigator();
		// posts.html fixture file contains 5 blocks.
		// Fixtures should migrate to 4 core/query and 1 core/rss blocks.
		cy.get( '[data-type="core/query"]' ).should( 'have.length', 4 );
		cy.get( '[data-type="core/rss"]' ).should( 'have.length', 1 );
	} );
} );


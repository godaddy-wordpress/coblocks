/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Highlight Block', function() {
	/**
	 * Test that we can add a Highlight block that migrates into the core/paragraph block.
	 */
	it( 'renders a paragraph block with a background color', function() {
		const config = Cypress.config();
		helpers.goTo( `/wp-admin/post.php?post=${ config.migrationPostList.highlight }&action=edit` );
		helpers.openBlockNavigator();
		// posts.html fixture file contains 5 blocks.
		// Fixtures should migrate to 4 core/query and 1 core/rss blocks.
		cy.get( '[data-type="core/paragraph"]' ).should( 'have.length', 1 );
	} );
} );

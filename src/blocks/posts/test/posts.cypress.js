// import { post } from './fixtures';

/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Posts Block', function() {
	// We now have the post ID from config. It lives in config.migrationPostList.posts
	/**
	 * Test that we can add an Posts block that migrates into the core/posts block or core/rss block respectively.
	 */
	it( 'Test posts block saves with empty values.', function() {
		const config = Cypress.config();
		helpers.goTo( `/wp-admin/post.php?post=${ config.migrationPostList.posts }&action=edit` );

		// cy.get( 'p[contenteditable="true"]' ).click();
		// cy.get( 'p[contenteditable="true"]' ).click().type( `${ post[ 0 ] }` );
		console.log( 'WHERE IS THIS THING?' );
		console.log( Cypress.config() );
	} );
} );


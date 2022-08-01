// import { post } from './fixtures';
import apiFetch from '@wordpress/api-fetch';

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
		cy.get( 'p[contenteditable="true"]' ).click();
		// cy.get( 'p[contenteditable="true"]' ).click().type( `${ post[ 0 ] }` );
		console.log( 'WHERE IS THIS THING?' );
		console.log( Cypress.config() );
	} );
} );


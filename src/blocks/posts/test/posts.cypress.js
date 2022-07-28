// import { post } from './fixtures';
/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Posts Block', function() {
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


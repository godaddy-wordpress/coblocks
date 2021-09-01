/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Service Block', function() {
	/**
	 * Test that we can add a service block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test service block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/service' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-service' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the service block saves with custom classes
	 */
	it( 'Test the service block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.addCustomBlockClass( 'my-custom-class', 'service' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/service' );

		cy.get( '.wp-block-coblocks-service' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-service' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

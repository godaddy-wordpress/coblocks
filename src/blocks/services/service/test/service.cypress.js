/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Service Block', function() {
	/**
	 * Test that we can add a service block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test service block does not render on front of site with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/service' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-service' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test the service block saves with custom classes
	 */
	it( 'Test the service block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.addCustomBlockClass( 'my-custom-class', 'service' );

		cy.get( '.wp-block-coblocks-services [data-type="coblocks/service"]:first-child h3' ).type( 'Title 1' );
		cy.get( '.wp-block-coblocks-services [data-type="coblocks/service"]:last-child h3' ).type( 'Title 2' );

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

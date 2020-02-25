/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Post Carousel Block', function() {
	/**
	 * Test that we can add a post-carousel block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test post-carousel block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'post-carousel' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'post-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-post-carousel' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the post-carousel block column and post count controls
	 */
	it( 'Test the post-carousel block column and post count controls.', function() {
		helpers.addCoBlocksBlockToPage( true, 'post-carousel' );

		cy.get( '.coblocks-slick' ).then( () => {
			helpers.setInputValue( 'post carousel settings', 'columns', 1 );

			helpers.setInputValue( 'post carousel settings', 'columns', 3 );

			helpers.setInputValue( 'post carousel settings', 'columns', 4 );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'post-carousel' );

		cy.get( '.coblocks-slick' ).click( { force: true } ).then( () => {
			helpers.setInputValue( 'feed settings', 'number of posts', 1 );

			helpers.setInputValue( 'feed settings', 'number of posts', 2 );

			helpers.setInputValue( 'feed settings', 'number of posts', 3 );

			cy.get( '.slick-track' ).children().should( 'have.length', 3 );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'post-carousel' );

		helpers.viewPage();

		cy.get( '.slick-track' ).children().should( 'have.length', 3 );

		helpers.editPage();
	} );

	/**
	 * Test the post-carousel block saves with custom classes
	 */
	it( 'Test the post-carousel block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'post-carousel' );

		cy.get( '.edit-post-sidebar' ).contains( /post carousel settings/i ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).contains( /feed settings/i ).click( { force: true } );

		helpers.addCustomBlockClass( 'my-custom-class', 'post-carousel' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'post-carousel' );

		cy.get( '.wp-block-coblocks-post-carousel' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-post-carousel' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

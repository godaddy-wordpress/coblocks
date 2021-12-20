/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Posts Block', function() {
	/**
	 * Test that we can add a posts block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test posts block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/posts', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/posts' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-posts' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the posts block column and post count controls
	 */
	it( 'Test posts block column and post count controls.', function() {
		helpers.addBlockToPost( 'coblocks/posts', true );

		cy.get( '.wp-block-coblocks-posts' ).find( '.has-2-columns' );

		helpers.setInputValue( 'posts settings', 'columns', 1 );

		cy.get( '.wp-block-coblocks-posts' ).find( '.has-1-columns' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/posts' );

		cy.get( '.wp-block-coblocks-posts' ).click();

		helpers.setInputValue( 'feed settings', 'number of posts', 3 );

		helpers.setInputValue( 'feed settings', 'number of posts', 2 );

		helpers.setInputValue( 'feed settings', 'number of posts', 1 );

		cy.get( '.wp-block-coblocks-posts  > .has-columns' ).children().should( 'have.length', 1 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/posts' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-posts  > .has-columns' ).children().should( 'have.length', 1 );

		helpers.editPage();
	} );

	/**
	 * Test the posts block saves with custom classes
	 */
	it( 'Test posts block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/posts', true );

		cy.get( '.edit-post-sidebar' ).contains( /posts settings/i ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).contains( /feed settings/i ).click( { force: true } );

		helpers.addCustomBlockClass( 'my-custom-class', 'posts' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/posts' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-posts' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a posts block to the content, change style
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test posts block saves with non-default style.', function() {
		helpers.addBlockToPost( 'coblocks/posts', true );

		cy.get( '.wp-block-coblocks-posts' ).find( '.has-2-columns' ).should( 'exist' );

		helpers.setBlockStyle( 'horizontal' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/posts' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-posts' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-posts' ).should( 'have.class', 'is-style-horizontal' );

		helpers.editPage();
	} );
} );

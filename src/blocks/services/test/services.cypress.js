/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Services Block', function() {
	/**
	 * Test that we can add a services block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test services block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/services' );
	} );

	/**
	 * Test that we can add a services block to the content, change
	 * column count and  are able to successfully save the block without errors.
	 */
	it( 'Test services block saves with columns attribute.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		// Select parent block
		helpers.selectBlock( 'services' );

		cy.get( '.edit-post-visual-editor [data-type="coblocks/service"]' ).should( 'have.length', 2 );

		helpers.setInputValue( 'Services settings', 'Columns', '{downarrow}', false );
		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 1 ); // should only have one placeholder on one column.

		helpers.setInputValue( 'Services settings', 'Columns', '{uparrow}{uparrow}', false );
		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 3 );

		helpers.setInputValue( 'Services settings', 'Columns', '{uparrow}', false );
		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 4 );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/services' );
	} );

	/**
	 * Test that we can add a services block to the content, change
	 * heading level and  are able to successfully save the block without errors.
	 *
	 * This function has an extended timeout because settings
	 * propagate down to children slowly
	 */
	it( 'Test services block saves with heading level set.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		// Select parent block
		helpers.selectBlock( 'services' );

		helpers.openHeadingToolbarAndSelect( 2 );
		cy.get( '.edit-post-visual-editor [data-type="coblocks/services"] h2' ).should( 'exist' );
		helpers.openHeadingToolbarAndSelect( 3 );
		cy.get( '.edit-post-visual-editor [data-type="coblocks/services"] h3' ).should( 'exist' );
		helpers.openHeadingToolbarAndSelect( 4 );
		cy.get( '.edit-post-visual-editor [data-type="coblocks/services"] h4' ).should( 'exist' );
		helpers.openHeadingToolbarAndSelect( 5 );
		cy.get( '.edit-post-visual-editor [data-type="coblocks/services"] h5' ).should( 'exist' );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/services' );
	} );

	/**
	 * Test that the service block move arrow orientation is correct
	 */
	it( 'Test service block has the proper arrow orientation.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		// helpers.selectBlock('service');
		cy.get( '.edit-post-visual-editor [data-type="coblocks/service"]:first-child' ).focus();
		cy.get( 'div.block-editor-block-mover' ).should( 'have.class', 'is-horizontal' );

		// Select parent block
		helpers.selectBlock( 'services' );

		helpers.setInputValue( 'Services settings', 'Columns', 1, false );

		cy.get( '.edit-post-visual-editor [data-type="coblocks/service"]:first-child' ).focus();
		cy.get( 'div.block-editor-block-mover' ).should( 'not.have.class', 'is-horizontal' );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/services' );
	} );

	/**
	 * Test that we can add a services block to the content with a nested button block
	 * and are able to successfully save the services and button blocks without errors.
	 */
	it( 'Test services block saves after adding button', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		cy.get( 'div.wp-block-button' ).should( 'not.exist' );

		const servicesBlock = cy.get( '[data-type="coblocks/services"]' );

		// Select the first child paragraph block of the parent services block
		const servicesBlockParagraph = servicesBlock.find( '[data-type="core/paragraph"]' ).first();

		// Insert a new buttons block into the services block
		servicesBlockParagraph.click().type( '/buttons' ).type( '{enter}' );

		cy.get( 'div.wp-block-button' ).should( 'exist' );

		// Check ability to save page without errors
		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/services' );

		// Check button persists after saving
		cy.get( 'div.wp-block-button' ).should( 'exist' );
	} );

	/**
	 * Test the services block saves with custom classes
	 */
	it( 'Test the services block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.addCustomBlockClass( 'my-custom-class', 'services' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/services' );

		cy.get( '.wp-block-coblocks-services' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-services' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

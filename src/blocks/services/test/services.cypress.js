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

		helpers.selectBlock( 'services' );

		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 2 );

		helpers.setInputValue( 'Services settings', 'Columns', '{downarrow}', false );

		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 1 );

		helpers.setInputValue( 'Services settings', 'Columns', '{uparrow}{uparrow}', false );

		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 3 );

		helpers.setInputValue( 'Services settings', 'Columns', '{uparrow}', false );

		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 4 );

		cy.get( 'h3 > [data-rich-text-placeholder="Write title…"]' ).parent().each( ( $serviceHeading, index ) => {
			cy.get( $serviceHeading ).click( { force: true } ).type( `Service ${ index }` );
		} );

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

		cy.get( 'h3 > [data-rich-text-placeholder="Write title…"]' ).should( 'have.length', 2 ).parent();

		helpers.selectBlock( 'services' );
		helpers.openHeadingToolbarAndSelect( 2 );
		cy.get( `h2 > [data-rich-text-placeholder="Write title…"]`, { timeout: 10000 } ).should( 'have.length', 2 ).parent();

		helpers.openHeadingToolbarAndSelect( 3 );
		cy.get( `h3> [data-rich-text-placeholder="Write title…"]`, { timeout: 10000 } ).should( 'have.length', 2 ).parent();

		helpers.openHeadingToolbarAndSelect( 4 );
		cy.get( `h4 > [data-rich-text-placeholder="Write title…"]`, { timeout: 10000 } ).should( 'have.length', 2 ).parent();

		helpers.openHeadingToolbarAndSelect( 5 );
		cy.get( `h5 > [data-rich-text-placeholder="Write title…"]`, { timeout: 10000 } ).should( 'have.length', 2 ).parent();

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/services' );
	} );

	/**
	 * Test that the service block move arrow orientation is correct
	 */
	it( 'Test service block has the proper arrow orientation.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.selectBlock( 'service', true );
		cy.get( 'div.block-editor-block-mover' ).should( 'not.have.class', 'is-vertical' );
		cy.get( 'div.block-editor-block-mover' ).should( 'not.have.class', 'is-horizontal' );

		helpers.selectBlock( 'service column', true );
		cy.get( 'div.block-editor-block-mover' ).should( 'have.class', 'is-horizontal' );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/services' );
	} );

	/**
	 * Test that we can add a services block to the content, enable
	 * action buttons and  are able to successfully save the block without errors.
	 */
	it( 'Test services block saves with action buttons enabled.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		cy.get( 'div.wp-block-button' ).should( 'not.exist' );

		helpers.toggleSettingCheckbox( /display buttons/i );

		cy.get( 'div.wp-block-button' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/services' );
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

	/**
	 * Test that we can add a service-column block to the content, change
	 * count and are able to successfully save the block without errors.
	 */
	it( 'Test service-column block saves with count attribute.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.selectBlock( 'services' );

		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 2 );

		cy.get( '.wp-block-coblocks-service-column .block-editor-button-block-appender' ).last().click();

		cy.get( '.wp-block-coblocks-service-column' ).last().find( '.wp-block-coblocks-service' ).should( 'have.length', 2 );

		cy.get( '.wp-block-coblocks-service-column .block-editor-button-block-appender' ).last().click();

		cy.get( '.wp-block-coblocks-service-column' ).last().find( '.wp-block-coblocks-service' ).should( 'have.length', 3 );

		cy.get( '.wp-block-coblocks-service-column .block-editor-button-block-appender' ).last().click();

		cy.get( '.wp-block-coblocks-service-column' ).last().find( '.wp-block-coblocks-service' ).should( 'have.length', 4 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/services' );
	} );

	/**
	 * Test that we can add a service-column block to the content, reduce
	 * column count and re able to successfully restore removed columns without errors.
	 */
	it( 'Test service-column blocks persist when column attribute changes.', function() {
		helpers.addBlockToPost( 'coblocks/services', true );

		helpers.selectBlock( 'services' );

		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 2 );

		cy.get( '.wp-block-coblocks-service-column .block-editor-button-block-appender' ).last().click().click().click();
		cy.get( '.wp-block-coblocks-service-column' ).last().find( '.wp-block-coblocks-service' ).should( 'have.length', 4 );

		helpers.selectBlock( 'services' );

		helpers.setInputValue( 'Services settings', 'Columns', '{downarrow}', false );
		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 1 );
		cy.get( '.wp-block-coblocks-service-column' ).find( '.wp-block-coblocks-service' ).should( 'have.length', 1 );

		helpers.setInputValue( 'Services settings', 'Columns', '{uparrow}', false );
		cy.get( '.wp-block-coblocks-service-column' ).should( 'have.length', 2 );
		cy.get( '.wp-block-coblocks-service-column' ).last().find( '.wp-block-coblocks-service' ).should( 'have.length', 4 );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/services' );
	} );
} );

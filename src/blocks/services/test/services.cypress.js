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
		helpers.addCoBlocksBlockToPage( true, 'services' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'services' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-services' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	* Test that we can add a services block to the content, change
	* column count and  are able to successfully save the block without errors.
	*/
	it( 'Test services block saves with columns attribute.', function() {
		helpers.addCoBlocksBlockToPage( true, 'services' );

		cy.get( '.wp-block-coblocks-services' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 2 );

		helpers.setInputValue( 'Services Settings', 'Columns', 1, false );

		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 1 );

		helpers.setInputValue( 'Services Settings', 'Columns', 3, false );

		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 3 );

		helpers.setInputValue( 'Services Settings', 'Columns', 4, false );

		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 4 );

		cy.get( 'h3[aria-label="Write title…"]' ).each( ( $serviceHeading, index ) => {
			cy.get( $serviceHeading ).click( { force: true } ).type( `Service ${ index }` );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'services' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-service' ).should( 'have.length', 4 );

		helpers.editPage();
	} );

	/**
	* Test that we can add a services block to the content, change
	* heading level and  are able to successfully save the block without errors.
	*/
	it( 'Test services block saves with heading level set.', function() {
		helpers.addCoBlocksBlockToPage( true, 'services' );

		cy.get( '.wp-block-coblocks-services' ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).find( 'button[aria-label="Heading 1"]' ).parent().parent().children().each( ( $hLevelToggle, $i ) => {
			cy.get( $hLevelToggle ).click();
			cy.get( '.wp-block-coblocks-service' ).first().find( `h${ $i + 1 }[aria-label="Write title…"]` ).should( 'exist' );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'services' );
	} );

	/**
	* Test that we can add a services block to the content, enable
	* action buttons and  are able to successfully save the block without errors.
	*/
	it( 'Test services block saves with action buttons enabled.', function() {
		helpers.addCoBlocksBlockToPage( true, 'services' );

		cy.get( 'div.wp-block-button' ).should( 'not.exist' );

		helpers.toggleSettingCheckbox( /action buttons/i );

		cy.get( 'div.wp-block-button' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'services' );
	} );

	/**
    * Test the services block saves with custom classes
    */
	it( 'Test the services block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'services' );

		helpers.addCustomBlockClass( 'my-custom-class', 'services' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'services' );

		cy.get( '.wp-block-coblocks-services' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-services' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

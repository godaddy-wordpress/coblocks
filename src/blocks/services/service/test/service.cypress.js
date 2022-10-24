/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Service Block', function() {
	/**
	 * Test that we can add a service block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	// it( 'Test service block does not render on front of site with empty values.', function() {
	// 	helpers.addBlockToPost( 'coblocks/services', true );
	//
	// 	helpers.savePage();
	//
	// 	helpers.checkForBlockErrors( 'coblocks/service' );
	//
	// 	helpers.viewPage();
	//
	// 	cy.get( '.wp-block-coblocks-service' ).should( 'not.exist' );
	//
	// 	helpers.editPage();
	// } );

	/**
	 * Test the service block saves with custom classes
	 */
	it( 'Test the service block custom classes.', function() {
		const { imageBase } = helpers.upload.spec;

		helpers.addBlockToPost( 'coblocks/services', true );

		cy.get( '.wp-block-coblocks-services [data-type="coblocks/service"]:first-child' ).click( { force: true } );

		helpers.upload.imageToBlock( 'coblocks/service' );

		cy.get( '.block-editor-block-inspector__advanced' ).scrollIntoView().find( 'button' ).then( ( $btn ) => {
			var isOpen = $btn.attr( 'aria-expanded' );
			if ( 'false' === isOpen ) {
				cy.wrap( $btn ).click();
			}
		} );

		cy.get( 'div.edit-post-sidebar' )
			.contains( /Additional CSS/i )
			.next( 'input' )
			.then( ( $inputElem ) => {
				cy.get( $inputElem ).invoke( 'val' ).then( ( val ) => {
					cy.get( $inputElem ).type( 'my-custom-class-1' );
				} );
			} );

		cy.get( '.wp-block-coblocks-services [data-type="coblocks/service"]:last-child' ).click( { force: true } );

		helpers.upload.imageToBlock( 'coblocks/service' );

		cy.get( '.block-editor-block-inspector__advanced' ).scrollIntoView().find( 'button' ).then( ( $btn ) => {
			var isOpen = $btn.attr( 'aria-expanded' );
			if ( 'false' === isOpen ) {
				cy.wrap( $btn ).click();
			}
		} );

		cy.get( 'div.edit-post-sidebar' )
			.contains( /Additional CSS/i )
			.next( 'input' )
			.then( ( $inputElem ) => {
				cy.get( $inputElem ).invoke( 'val' ).then( ( val ) => {
					cy.get( $inputElem ).type( 'my-custom-class-2' );
				} );
			} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/service' );

		cy.get( '.wp-block-coblocks-services .wp-block-coblocks-service:first-child' )
			.should( 'have.class', 'my-custom-class-1' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-services .wp-block-coblocks-service:last-child' )
			.should( 'have.class', 'my-custom-class-2' );

		helpers.editPage();
	} );
} );

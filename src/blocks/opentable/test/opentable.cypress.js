/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks OpenTable Block', function() {
	/**
	 * Test that we can add a OpenTable block to the content, not add anything and save the block
	 * without errors.
	 */
	it( 'Test OpenTable block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/opentable' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-opentable' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a restaurant and then
	 * successfully save the block without errors.
	 */
	it( 'Test opentable block saves with single restaurant selection.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		cy.get( '.wp-block-coblocks-opentable .components-form-token-field__input' ).type( 'test' );

		cy.wait( 1000 );

		cy.get( '.components-form-token-field__suggestion' ).first().click();

		cy.get( 'button[type="submit"]' ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/opentable' );

		helpers.viewPage();

		// cy.get( '.wp-block-coblocks-opentable' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		// helpers.editPage();
	} );

	// /**
	//  * Test that we can add image from library and are able
	//  * to successfully save the block without errors.
	//  */
	// it( 'Test logos block saves with image from media library.', function() {
	// 	helpers.addBlockToPost( 'coblocks/logos', true );

	// 	cy.get( '[data-type="coblocks/logos"]' )
	// 		.first()
	// 		.click()
	// 		.contains( /media library/i )
	// 		.click();

	// 	cy.get( '.media-modal-content' ).contains( /media library/i ).click();

	// 	cy.get( '.media-modal-content' ).find( 'li.attachment' )
	// 		.first( 'li' )
	// 		.click();

	// 	cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
	// 		if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		} else { // pre wp 5.4
	// 			cy.get( 'button' ).contains( /create a new gallery/i ).click();
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		}
	// 	} );

	// 	helpers.savePage();

	// 	helpers.checkForBlockErrors( 'coblocks/logos' );

	// 	helpers.viewPage();

	// 	cy.get( '.wp-block-coblocks-logos' ).should( 'exist' );
	// 	cy.get( '.wp-block-coblocks-logos' ).find( 'img' ).should( 'have.attr', 'src' );

	// 	helpers.editPage();
	// } );

	// /**
	//  * Test that we can add "black and white" image filter and
	//  * successfully save the block without errors.
	//  */
	// it( 'Test logos block saves with black and white filter.', function() {
	// 	helpers.addBlockToPost( 'coblocks/logos', true );

	// 	cy.get( '[data-type="coblocks/logos"]' )
	// 		.first()
	// 		.click()
	// 		.contains( /media library/i )
	// 		.click();

	// 	cy.get( '.media-modal-content' ).contains( /media library/i ).click();

	// 	cy.get( '.media-modal-content' ).find( 'li.attachment' )
	// 		.first( 'li' )
	// 		.click();

	// 	cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
	// 		if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		} else { // pre wp 5.4
	// 			cy.get( 'button' ).contains( /create a new gallery/i ).click();
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		}
	// 	} );

	// 	helpers.setBlockStyle( /black & white/i );

	// 	cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-black-and-white' );

	// 	helpers.savePage();

	// 	helpers.checkForBlockErrors( 'coblocks/logos' );

	// 	helpers.viewPage();

	// 	cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-black-and-white' );

	// 	helpers.editPage();
	// } );

	// /**
	//  * Test that we can add image "grayscale" filter and
	//  * successfully save the block without errors.
	//  */
	// it( 'Test logos block saves with grayscale filter.', function() {
	// 	helpers.addBlockToPost( 'coblocks/logos', true );

	// 	cy.get( '[data-type="coblocks/logos"]' )
	// 		.first()
	// 		.click()
	// 		.contains( /media library/i )
	// 		.click();

	// 	cy.get( '.media-modal-content' ).contains( /media library/i ).click();

	// 	cy.get( '.media-modal-content' ).find( 'li.attachment' )
	// 		.first( 'li' )
	// 		.click();

	// 	cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
	// 		if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		} else { // pre wp 5.4
	// 			cy.get( 'button' ).contains( /create a new gallery/i ).click();
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		}
	// 	} );

	// 	helpers.setBlockStyle( /grayscale/i );

	// 	cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-grayscale' );

	// 	helpers.savePage();

	// 	helpers.checkForBlockErrors( 'coblocks/logos' );

	// 	helpers.viewPage();

	// 	cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-grayscale' );

	// 	helpers.editPage();
	// } );

	// /**
	//  * Test that we can add image "default" filter and
	//  * successfully save the block without errors.
	//  */
	// it( 'Test logos block saves with default filter.', function() {
	// 	helpers.addBlockToPost( 'coblocks/logos', true );

	// 	cy.get( '[data-type="coblocks/logos"]' )
	// 		.first()
	// 		.click()
	// 		.contains( /media library/i )
	// 		.click();

	// 	cy.get( '.media-modal-content' ).contains( /media library/i ).click();

	// 	cy.get( '.media-modal-content' ).find( 'li.attachment' )
	// 		.first( 'li' )
	// 		.click();

	// 	cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
	// 		if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		} else { // pre wp 5.4
	// 			cy.get( 'button' ).contains( /create a new gallery/i ).click();
	// 			cy.get( 'button' ).contains( /insert gallery/i ).click();
	// 		}
	// 	} );

	// 	helpers.setBlockStyle( /default/i );

	// 	cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-default' );

	// 	helpers.savePage();

	// 	helpers.checkForBlockErrors( 'coblocks/logos' );

	// 	helpers.viewPage();

	// 	cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-default' );

	// 	helpers.editPage();
	// } );
} );

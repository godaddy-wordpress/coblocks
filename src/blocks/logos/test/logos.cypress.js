/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Logos Block', function() {
	/**
	 * Test that we can add a logos block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test logos block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/logos', true );

		cy.get( '.wp-block-coblocks-logos' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/logos' );
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test logos block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/logos', true );

		cy.get( '[data-type="coblocks/logos"]' ).first().click();

		helpers.upload.imageToBlock( 'coblocks/logos' );

		cy.get( '.wp-block-coblocks-logos img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.checkForBlockErrors( 'coblocks/logos' );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test logos block saves with image from media library.', function() {
		helpers.addBlockToPost( 'coblocks/logos', true );

		cy.get( '[data-type="coblocks/logos"]' )
			.first()
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
			if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			} else { // pre wp 5.4
				cy.get( 'button' ).contains( /create a new gallery/i ).click();
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			}
		} );

		helpers.checkForBlockErrors( 'coblocks/logos' );

		cy.get( '.wp-block-coblocks-logos' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-logos' ).find( 'img' ).should( 'have.attr', 'src' );
	} );

	/**
	 * Test that we can add "black and white" image filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with black and white filter.', function() {
		helpers.addBlockToPost( 'coblocks/logos', true );

		cy.get( '[data-type="coblocks/logos"]' )
			.first()
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
			if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			} else { // pre wp 5.4
				cy.get( 'button' ).contains( /create a new gallery/i ).click();
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			}
		} );

		// 'whit' instead of 'white' is intentional. Sometimes when rendering with smaller screens,
		// it shows Black & Whit... instead of Black & White
		helpers.setBlockStyle( /black & whit/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-black-and-white' );

		helpers.checkForBlockErrors( 'coblocks/logos' );
	} );

	/**
	 * Test that we can add image "grayscale" filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with grayscale filter.', function() {
		helpers.addBlockToPost( 'coblocks/logos', true );

		cy.get( '[data-type="coblocks/logos"]' )
			.first()
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
			if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			} else { // pre wp 5.4
				cy.get( 'button' ).contains( /create a new gallery/i ).click();
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			}
		} );

		helpers.setBlockStyle( /grayscale/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-grayscale' );

		helpers.checkForBlockErrors( 'coblocks/logos' );
	} );

	/**
	 * Test that we can add image "default" filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with default filter.', function() {
		helpers.addBlockToPost( 'coblocks/logos', true );

		cy.get( '[data-type="coblocks/logos"]' )
			.first()
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
			if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			} else { // pre wp 5.4
				cy.get( 'button' ).contains( /create a new gallery/i ).click();
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			}
		} );

		helpers.setBlockStyle( /default/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-default' );

		helpers.checkForBlockErrors( 'coblocks/logos' );
	} );
} );

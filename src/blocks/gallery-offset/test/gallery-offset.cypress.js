/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gallery Offset Block', function() {
	/**
	 * Setup Gallery data
	 */
	const galleryData = {
		caption: 'Caption Here',
	};

	/**
	 * Test that we can add a gallery-offset block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test offset block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-offset' ).find( 'ul' ).should( 'be.empty' );

		helpers.editPage();
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test offset block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		cy.get( '[data-type="coblocks/gallery-offset"]' ).click();

		helpers.upload.imageToBlock( 'coblocks/gallery-offset' );

		cy.get( '.coblocks-gallery--item img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it.skip( 'Test offset block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		cy.get( '[data-type="coblocks/gallery-offset"]' )
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

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it.skip( 'Test offset block saves with images captions.', function() {
		const { caption } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		cy.get( '[data-type="coblocks/gallery-offset"]' )
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

		helpers.toggleSettingCheckbox( /captions/i );

		cy.get( '.coblocks-gallery--item' ).first().click()
			.find( 'figcaption' ).focus().type( caption );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that we can add image captions with rich text options
	 */
	it.skip( 'Test offset captions allow rich text controls.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		cy.get( '[data-type="coblocks/gallery-offset"]' )
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

		helpers.toggleSettingCheckbox( /captions/i );

		cy.get( '.block-editor-format-toolbar' ).should( 'not.exist' );

		cy.get( '.coblocks-gallery--item' ).first().click()
			.find( 'figcaption' ).focus();

		cy.get( '.block-editor-format-toolbar, .block-editor-rich-text__inline-format-toolbar-group' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that we can add image and replace image.
	 */
	it.skip( 'Test offset replace image flow.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		helpers.upload.imageReplaceFlow( 'coblocks/gallery-offset' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );
} );

/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gallery Masonry Block', function() {
	/**
	 * Setup Gallery data
	 */
	const galleryData = {
		caption: 'Caption Here',
	};

	/**
	 * Test that we can add a gallery-masonry block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test masonry block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-masonry' );
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test masonry block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

		cy.get( 'figure[data-type="coblocks/gallery-masonry"]' ).click();

		helpers.upload.imageToBlock( 'coblocks/gallery-masonry' );

		cy.get( 'figure[data-type="core/image"] img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-masonry' );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test masonry block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

		cy.get( 'figure[data-type="coblocks/gallery-masonry"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();
		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-masonry' );
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it( 'Test masonry block saves with images captions.', function() {
		const { caption } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

		cy.get( 'figure[data-type="coblocks/gallery-masonry"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();
		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.selectBlock( 'masonry' );

		cy.get( 'figcaption[role="textbox"]' ).click( { force: true } );

		cy.get( 'figcaption[role="textbox"]' ).focus().type( caption );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-masonry' );
	} );

	/**
	 * Test that we can add image captions with rich text options
	 */
	it( 'Test masonry captions allow rich text controls.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

		cy.get( 'figure' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();
		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.selectBlock( 'masonry' );

		cy.get( '.block-editor-format-toolbar' ).should( 'not.exist' );

		cy.get( 'figcaption[role="textbox"]' ).click();

		cy.get( '.block-editor-format-toolbar, .block-editor-rich-text__inline-format-toolbar-group' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-masonry' );
	} );

	/**
	 * Test that we can add image and replace image.
	 */
	it( 'Test masonry replace image flow.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

		cy.get( 'figure[data-type="coblocks/gallery-masonry"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();
		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.selectBlock( 'image' );

		const replaceImageSelectors = ( () => [
			'.block-editor-block-toolbar div:nth-of-type(5) button:not(.has-icon)', // WP 6.3 +.
			'.block-editor-block-toolbar div:nth-of-type(4) button:not(.has-icon)', // WP 6.2.
		].join() )();

		cy.get( replaceImageSelectors ).click();

		cy.get( '.components-popover__content' ).should( 'be.visible' );

		cy.get( '.block-editor-media-replace-flow__media-upload-menu .components-menu-item__button' ).contains( 'Open Media Library' );

		cy.get( replaceImageSelectors ).click();

		cy.get( 'figure[data-type="coblocks/gallery-masonry"]' ).click();

		cy.get( '.components-popover__content' ).should( 'not.exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-masonry' );
	} );
} );

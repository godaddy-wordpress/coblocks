/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gallery Collage Block', function() {
	/**
	 * Setup Gallery data
	 */
	const galleryData = {
		caption: 'Caption Here',
	};

	const createNewPost = () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=post' );
		helpers.disableGutenbergFeatures();
		helpers.addBlockToPost( 'coblocks/gallery-collage' );
	};

	/**
	 * Test that we can add a gallery-collage block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test collage block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-collage' );
		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test collage block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		createNewPost();
		helpers.selectBlock( 'collage' );

		helpers.upload.imageToBlock( 'coblocks/gallery-collage' );

		cy.get( '.wp-block-coblocks-gallery-collage__item img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test collage block saves with images from media library.', function() {
		createNewPost();
		cy.get( '[data-type="coblocks/gallery-collage"]' )
			.find( '.components-button' )
			.contains( /media library/i )
			.first()
			.click( { force: true } );

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-modal-content' ).find( '.media-button-select' ).click();

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it( 'Test collage block saves with images captions.', function() {
		const { caption } = galleryData;
		createNewPost();
		cy.get( '[data-type="coblocks/gallery-collage"]' )
			.find( '.components-button' )
			.contains( /media library/i )
			.first()
			.click( { force: true } );

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-modal-content' ).find( '.media-button-select' ).click();

		helpers.toggleSettingCheckbox( /captions/i );

		cy.get( '.wp-block-coblocks-gallery-collage__item' ).first().click()
			.find( 'figcaption' ).focus().type( caption, { force: true } );

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );
	} );

	/**
	 * Test that we can add image captions with rich text options
	 * No assertion that rich text options do not exist.
	 * Collage block has always-focused rich text options.
	 */
	it( 'Test collage captions allow rich text controls.', function() {
		createNewPost();
		cy.get( '[data-type="coblocks/gallery-collage"]' )
			.find( '.components-button' )
			.contains( /media library/i )
			.first()
			.click( { force: true } );

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-modal-content' ).find( '.media-button-select' ).click();

		helpers.toggleSettingCheckbox( /captions/i );

		// Focus the image
		cy.get( '.wp-block-coblocks-gallery-collage__item' ).first().click();

		// Locate the caption and type in it
		cy.get( '.wp-block-coblocks-gallery-collage__item' )
			.find( 'figcaption' )
			.first()
			.type( 'a caption', { force: true } );

		cy.get( '.block-editor-format-toolbar, .block-editor-rich-text__inline-format-toolbar-group' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );
	} );

	it( 'can replace the existing image through the "Replace" button', () => {
		helpers.addBlockToPost( 'coblocks/gallery-collage', true );

		helpers.upload.imageReplaceFlow( 'coblocks/gallery-collage' );

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-collage' );
	} );
} );

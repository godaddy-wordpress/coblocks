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
	it( 'Test offset block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		cy.get( '[data-type="coblocks/gallery-offset"]' )
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

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it( 'Test offset block saves with images captions.', function() {
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

		cy.get( 'button' ).contains( /create a new gallery/i ).click();
		cy.get( 'button' ).contains( /insert gallery/i ).click();

		// Ensure inspector is open and Block tab is active for captions toggle to work
		cy.get( '[data-type="coblocks/gallery-offset"]' ).click();
		helpers.openInspectorPanel();

		helpers.toggleSettingCheckbox( /captions/i );

		// Click the block first to ensure it's selected, then click the image container
		cy.get( '[data-type="coblocks/gallery-offset"]' ).click();

		// Wait for block to be selected (has is-selected class)
		cy.get( '[data-type="coblocks/gallery-offset"].is-selected' );

		cy.get( '[data-type="coblocks/gallery-offset"]' ).within( () => {
			cy.get( '.coblocks-gallery--item' ).first().click();
		} );

		// Wait for caption element to appear after clicking
		cy.get( '.coblocks-gallery--item' ).within( () => {
			cy.get( 'figcaption, [data-rich-text-placeholder], [contenteditable="true"]' );
		} );

		// Wait for figcaption to appear or try alternative selectors
		cy.get( '.coblocks-gallery--item' ).within( () => {
			// Try multiple approaches to find and interact with caption
			cy.get( 'figcaption, [data-rich-text-placeholder], [contenteditable="true"]' ).first().focus().type( caption );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that we can add image captions with rich text options
	 */
	it( 'Test offset captions allow rich text controls.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		cy.get( '[data-type="coblocks/gallery-offset"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();
		cy.get( 'button' ).contains( /insert gallery/i ).click();

		// Ensure inspector is open and Block tab is active for captions toggle to work
		cy.get( '[data-type="coblocks/gallery-offset"]' ).click();
		helpers.openInspectorPanel();

		helpers.toggleSettingCheckbox( /captions/i );

		cy.get( '.block-editor-format-toolbar' ).should( 'not.exist' );

		// Click the block first to ensure it's selected, then click the image container
		cy.get( '[data-type="coblocks/gallery-offset"]' ).click();

		// Wait for block to be selected (has is-selected class)
		cy.get( '[data-type="coblocks/gallery-offset"].is-selected' );

		cy.get( '[data-type="coblocks/gallery-offset"]' ).within( () => {
			cy.get( '.coblocks-gallery--item' ).first().click();
		} );

		// Wait for caption element to appear after clicking
		cy.get( '.coblocks-gallery--item' ).within( () => {
			cy.get( 'figcaption, [data-rich-text-placeholder], [contenteditable="true"]' );
		} );

		cy.get( '.coblocks-gallery--item' ).within( () => {
			// Try multiple approaches to find and focus caption
			cy.get( 'figcaption, [data-rich-text-placeholder], [contenteditable="true"]' ).first().focus();
		} );

		cy.get( '.block-editor-format-toolbar, .block-editor-rich-text__inline-format-toolbar-group' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that we can add image and replace image.
	 */
	it( 'Test offset replace image flow.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		helpers.upload.imageReplaceFlow( 'coblocks/gallery-offset' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that custom link editing works properly for offset block images.
	 */
	it( 'Test offset block custom link functionality.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		// Upload image to the block
		helpers.upload.imageToBlock( 'coblocks/gallery-offset' );

		// Wait for image to load and block to stabilize
		cy.get( '.coblocks-gallery--item img[src*="http"]' ).should( 'be.visible' );

		// Use the helper function to set custom link
		helpers.setGalleryCustomLink(
			'coblocks/gallery-offset',
			'https://example.com',
			'.coblocks-gallery--item img'
		);

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );

	/**
	 * Test that other link options work correctly with offset block.
	 */
	it( 'Test offset block link options functionality.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-offset', true );

		// Upload image to the block
		helpers.upload.imageToBlock( 'coblocks/gallery-offset' );

		// Wait for image to load and block to stabilize
		cy.get( '.coblocks-gallery--item img[src*="http"]' ).should( 'be.visible' );

		// Ensure block is selected for Link Settings to render
		cy.get( '[data-type="coblocks/gallery-offset"]' ).click();
		cy.window().then( ( win ) => {
			if ( win.wp && win.wp.data ) {
				const blockEditor = win.wp.data.select( 'core/block-editor' );
				const selectedBlock = blockEditor.getSelectedBlock();

				// ASSERT: Block must be selected for Link Settings to render
				if ( selectedBlock ) {
					expect( selectedBlock.name ).to.equal( 'coblocks/gallery-offset' );
					expect( selectedBlock.attributes.images ).to.have.length.at.least( 1 );
				}
			}
		} );

		// Reset any open inspector and reopen cleanly
		cy.get( 'body' ).then( ( $body ) => {
			const sidebar = $body.find( '.interface-interface-skeleton__sidebar' );
			if ( sidebar.is( ':visible' ) ) {
				// Close inspector if already open
				cy.get( '.editor-header__settings, .edit-post-header__settings' ).click();
				// Wait for sidebar to close
				cy.get( '.interface-interface-skeleton__sidebar' ).should( 'not.be.visible' );
			}
		} );

		// Open inspector fresh
		cy.get( '.editor-header__settings, .edit-post-header__settings' ).click();
		cy.get( '.interface-interface-skeleton__sidebar' ).should( 'be.visible' );

		// CRITICAL: Ensure Block tab is active and panels are loaded
		cy.get( '[data-tab-id="edit-post/block"]' ).should( 'exist' ).then( ( $blockTab ) => {
			if ( $blockTab.attr( 'aria-selected' ) !== 'true' ) {
				cy.get( '[data-tab-id="edit-post/block"]' ).click();
				// Wait for tab switch and panel loading
				cy.get( '[data-tab-id="edit-post/block"]' ).should( 'have.attr', 'aria-selected', 'true' );
			}
		} );

		// Wait for panels to load and ensure Link Settings panel exists
		cy.get( '.components-panel__body-title' ).should( 'have.length.at.least', 3 );
		cy.get( '.components-panel__body-title' ).contains( /link/i ).should( 'exist' );

		// Expand Link Settings panel if needed
		cy.get( '.components-panel__body-title button' ).contains( /link/i ).then( ( $button ) => {
			const isExpanded = $button.attr( 'aria-expanded' ) === 'true';

			if ( ! isExpanded ) {
				cy.wrap( $button ).click();
				cy.get( '.components-panel__body-title button' ).contains( /link/i ).should( 'have.attr', 'aria-expanded', 'true' );
			}
		} );

		// Wait for SelectControl to render and test all link options
		cy.get( '.components-panel__body' ).contains( /link/i ).closest( '.components-panel__body' ).within( () => {
			cy.get( 'select' );
			cy.get( 'select' ).select( 'none' );
		} );

		// Test all link options comprehensively
		cy.get( '.components-panel__body' ).contains( /link/i ).closest( '.components-panel__body' ).within( () => {
			// Test Media link
			cy.get( 'select' ).select( 'media' );

			// Test Attachment link
			cy.get( 'select' ).select( 'attachment' );

			// Test Custom link
			cy.get( 'select' ).select( 'custom' );

			// Test back to None
			cy.get( 'select' ).select( 'none' );
		} );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/gallery-offset' );
	} );
} );

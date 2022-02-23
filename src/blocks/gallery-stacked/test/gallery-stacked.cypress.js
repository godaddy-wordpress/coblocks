/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gallery Stacked Block', function() {
	/**
	 * Setup Gallery data
	 */
	const galleryData = {
		caption: 'Caption Here',
	};

	/**
	 * Test that we can add a gallery-stacked block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test stacked block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-stacked' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-stacked' ).find( 'ul' ).should( 'be.empty' );

		helpers.editPage();
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test stacked block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		helpers.selectBlock( 'stacked' );

		helpers.upload.imageToBlock( 'coblocks/gallery-stacked' );

		cy.get( '.coblocks-gallery--item img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-stacked' );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test stacked block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		cy.get( '[data-type="coblocks/gallery-stacked"]' )
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

		helpers.checkForBlockErrors( 'coblocks/gallery-stacked' );
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it( 'Test stacked block saves with images captions.', function() {
		const { caption } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		cy.get( '[data-type="coblocks/gallery-stacked"]' )
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

		helpers.checkForBlockErrors( 'coblocks/gallery-stacked' );
	} );

	/**
	 * Test that we can add image captions with rich text options
	 */
	it( 'Test stacked captions allow rich text controls.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		cy.get( '[data-type="coblocks/gallery-stacked"]' )
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

		helpers.checkForBlockErrors( 'coblocks/gallery-stacked' );
	} );

	/**
	 * Test that we can add image and replace image.
	 */
	it( 'Test stacked replace image flow.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		helpers.upload.imageReplaceFlow( 'coblocks/gallery-stacked' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-stacked' );
	} );

	/**
	 * Test the text sizes change as expected
	 */
	it( 'Test the text sizes change as expected.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		const { caption } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-stacked', true );

		cy.get( '[data-type="coblocks/gallery-stacked"]' )
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

		cy.get( '[data-wp-component="ToolsPanelHeader"] button' ).click();
		cy.get( 'button' ).contains( 'Font size' ).click();

		cy.get( '.components-toggle-group-control-option' ).then( ( elems ) => {
			let dataValue = Cypress.$( 'figcaption.coblocks-gallery--caption' ).css( 'font-size' );
			Array.from( elems ).forEach( ( elem ) => {
				cy.get( elem ).focus().click().then( () => {
					// We do not test the value due to theme setting specified font sizes.
					// Instead we test that the value has changed from previous value.
					cy.get( 'figcaption.coblocks-gallery--caption' ).should( 'not.to.have.css', 'font-size', dataValue );
					dataValue = Cypress.$( 'figcaption.coblocks-gallery--caption' ).css( 'font-size' );
				} );
			} );
		} );
	} );
} );

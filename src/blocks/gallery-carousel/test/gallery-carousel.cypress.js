/* eslint-disable jest/valid-expect-in-promise */
// Disable reason: Cypress chained functions are not true promises and do not require a return.
// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Not-Promises
/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gallery Carousel Block', function() {
	/**
	 * Setup Gallery data
	 */
	const galleryData = {
		caption: 'Caption Here',
	};

	const handleVariation = () => {
		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(1) button' ).click( { force: true } );
	};

	/**
	 * Test that we can add a gallery-carousel block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test carousel block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-carousel' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test carousel block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		handleVariation();

		cy.get( '[data-type="coblocks/gallery-carousel"]' ).click();

		helpers.upload.imageToBlock( 'coblocks/gallery-carousel' );

		cy.get( 'div.coblocks-gallery--item img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test carousel block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		handleVariation();

		cy.get( '[data-type="coblocks/gallery-carousel"]' )
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

		helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it( 'Test carousel block saves with images captions.', function() {
		const { caption } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		handleVariation();

		cy.get( '[data-type="coblocks/gallery-carousel"]' )
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

		cy.get( '[data-type="coblocks/gallery-carousel"]' ).find( 'figcaption' ).focus().type( caption );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );
	} );

	/**
	 * Test that we can add image captions with rich text options
	 */
	it( 'Test carousel captions allow rich text controls.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		handleVariation();

		cy.get( '[data-type="coblocks/gallery-carousel"]' )
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

		cy.get( '.block-editor-format-toolbar, .block-editor-rich-text__inline-format-toolbar-group' ).should( 'not.exist' );

		cy.get( '[data-type="coblocks/gallery-carousel"]' ).find( 'figcaption' ).focus();


		cy.get( '.block-editor-format-toolbar, .block-editor-rich-text__inline-format-toolbar-group' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );
	} );

	/**
	 * Test that we can add image and replace image.
	 */
	it( 'Test carousel replace image flow.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		handleVariation();

		helpers.upload.imageReplaceFlow( 'coblocks/gallery-carousel' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );
	} );
} );

/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gallery Carousel Block', function() {
	/**
	 * Setup Gallery data
	 */
	const galleryData = {
		fileName: '150x150.png',
		imageBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
		caption: 'Caption Here',
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
		const { fileName, imageBase, pathToFixtures } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		cy.get( '.wp-block[data-type="coblocks/gallery-carousel"]' )
			.click();

		cy.fixture( pathToFixtures + fileName, 'base64' ).then( ( fileContent ) => {
			cy.get( 'div[data-type="coblocks/gallery-carousel"]' )
				.find( 'div.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				)
				.wait( 2000 ); // Allow upload to finish.

			cy.get( 'div.coblocks-gallery--item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.savePage();

			helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );

			helpers.viewPage();

			cy.get( 'div.coblocks-gallery--item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.editPage();
		} );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test carousel block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		cy.get( '.wp-block[data-type="coblocks/gallery-carousel"]' )
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

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-carousel' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gallery-carousel' ).find( 'img' ).should( 'have.attr', 'src' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add image captions
	 * to successfully save the block without errors.
	 */
	it( 'Test carousel block saves with images captions.', function() {
		const { caption } = galleryData;
		helpers.addBlockToPost( 'coblocks/gallery-carousel', true );

		cy.get( '.wp-block[data-type="coblocks/gallery-carousel"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-frame-toolbar .media-toolbar-primary' ).then( ( mediaToolbar ) => {
			console.log( mediaToolbar.prop( 'outerHTML' ) );
			if ( mediaToolbar.prop( 'outerHTML' ).includes( 'Insert gallery' ) ) { // wp 5.4
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			} else { // pre wp 5.4
				cy.get( 'button' ).contains( /create a new gallery/i ).click();
				cy.get( 'button' ).contains( /insert gallery/i ).click();
			}
		} );

		cy.get( '.wp-block[data-type="coblocks/gallery-carousel"]' ).find( 'figcaption' ).click().type( caption );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/gallery-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-carousel' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gallery-carousel' ).contains( caption );

		helpers.editPage();
	} );
} );

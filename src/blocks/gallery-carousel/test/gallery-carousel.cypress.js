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
	};
	/**
	   * Test that we can add a gallery-carousel block to the content, not add any images or
	   * alter any settings, and are able to successfuly save the block without errors.
	   */
	it( 'Test carousel block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gallery-carousel' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'gallery-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-carousel' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
   * Test that we can upload images to block and are able
   * to successfuly save the block without errors.
   */
	it( 'Test carousel block saves with images.', function() {
		const { fileName, imageBase, pathToFixtures } = galleryData;
		helpers.addCoBlocksBlockToPage( true, 'gallery-carousel' );

		cy.get( '.wp-block[data-type="coblocks/gallery-carousel"]' )
			.click();

		cy.fixture( pathToFixtures + fileName, 'base64' ).then( fileContent => {
			cy.get( 'div[data-type="coblocks/gallery-carousel"]' )
				.find( 'div.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				)
				.wait( 2000 ); // Allow upload to finish.

			cy.get( 'div.coblocks-gallery--item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.savePage();

			helpers.checkForBlockErrors( 'gallery-carousel' );

			helpers.viewPage();

			cy.get( 'div.coblocks-gallery--item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.editPage();
		} );
	} );

	/**
   * Test that we can add image from library and are able
   * to successfuly save the block without errors.
   */
	it( 'Test carousel block saves with images from media library.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gallery-carousel' );

		cy.get( '.wp-block[data-type="coblocks/gallery-carousel"]' )
			.click()
			.contains( /media/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'gallery-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-carousel' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gallery-carousel' ).find( 'img' ).should( 'have.attr', 'src' );

		helpers.editPage();
	} );
} );

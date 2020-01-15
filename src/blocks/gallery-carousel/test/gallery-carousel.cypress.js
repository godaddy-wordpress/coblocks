/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Gallery Carousel Block', function() {
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
   * Test that we can add images to block and are able
   * to successfuly save the block without errors.
   */
	it( 'Test carousel block saves with images.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gallery-carousel' );

		cy.get( '.wp-block[data-type="coblocks/gallery-carousel"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( 'div.media-modal' ).contains( /media library/i ).click();

		cy.get( 'div.media-modal' )
			.find( 'li.attachment' )
			.first( 'li' )
			.click().next().click().next().click(); // Add 3 images

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'gallery-carousel' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-carousel' ).should( 'exist' );

		helpers.editPage();
	} );
} );

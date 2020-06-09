/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Media Card Block', function() {
	/**
	 * Setup media-card data
	 */
	const mediaData = {
		colorData: {
			backgroundColor: '#ff0000',
			backgroundColorRGB: 'rgb(255, 0, 0)',
		},
	};

	/**
	 * Test that we can add a media-card block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test media-card block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/media-card', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/media-card' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-media-card' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test media-card block saves with image upload.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/media-card', true );

		cy.get( '.wp-block[data-type="coblocks/media-card"]' ).click();

		helpers.upload.imageToBlock( 'coblocks/media-card' );

		cy.get( `img[src*="${imageBase}"]` );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/media-card' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-media-card' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.editPage();
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test media-card block saves with images from media library.', function() {
		helpers.addBlockToPost( 'coblocks/media-card', true );

		cy.get( '.wp-block[data-type="coblocks/media-card"]' )
			.click()
			.find( 'button' )
			.contains( /media library/i )
			.click( { force: true } );

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( '.media-toolbar' ).find( 'button' ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/media-card' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-media-card' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-media-card' ).find( 'img' ).should( 'have.attr', 'src' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a media-card block to the content, adjust colors
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test media-card block saves with color values set.', function() {
		const { backgroundColor, backgroundColorRGB } = mediaData.colorData;
		helpers.addBlockToPost( 'coblocks/media-card', true );

		helpers.setColorSetting( 'background color', backgroundColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/media-card' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-media-card' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-media-card__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB );

		helpers.editPage();
	} );
} );

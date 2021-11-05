/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Lightbox Controls extension', function() {
	/**
	 * Test that we can add a image block to the content add image,
	 * and alter image using the Lightbox Controls extension
	 */
	it( 'Test core/image block extends with Lightbox Controls component.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'core/image', true );

		helpers.upload.imageToBlock( 'core/image' );

		cy.get( '.has-lightbox' ).should( 'not.exist' );

		helpers.toggleSettingCheckbox( /Lightbox/ );

		cy.get( '.has-lightbox' ).should( 'exist' );

		cy.get( 'figure.wp-block-image img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.savePage();

		helpers.checkForBlockErrors( 'core/image' );

		helpers.viewPage();

		cy.get( 'figure.wp-block-image img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		cy.get( '.has-lightbox' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a image block to the content add image,
	 * and open Lightbox on Front-end when aligned
	 */
	[ 'left', 'center', 'right', 'wide', 'full' ].forEach( ( alignment ) => {
		return it( `Test ${ alignment } alignment core/image block with Lightbox Controls component.`, function() {
			const { imageBase } = helpers.upload.spec;
			helpers.addBlockToPost( 'core/image', true );

			helpers.upload.imageToBlock( 'core/image' );

			cy.get( '[aria-label="Change alignment"], [aria-label="Align"]' ).click();

			cy.get( '[aria-label="Change alignment"], [aria-label="Align"]' ).contains( new RegExp( alignment, 'i' ) ).click();

			helpers.toggleSettingCheckbox( /Lightbox/ );

			helpers.savePage();

			helpers.viewPage();

			cy.get( `figure[class*="align${ alignment }"] img[src*="http"][class^="wp-image-"]` ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			cy.get( '.coblocks-lightbox' ).should( 'be.hidden' );

			cy.get( `figure[class*="align${ alignment }"] img[src*="http"][class^="wp-image-"]` ).click( { force: true } );

			cy.get( '.coblocks-lightbox' ).should( 'be.visible' );

			helpers.editPage();
		} );
	} );

	/**
	 * Test that we can add a gallery block to the content add image,
	 * and alter image using the Lightbox Controls extension
	 */
	it.skip( 'Test core/gallery block extends with Lightbox Controls component.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'core/gallery', true );

		helpers.upload.imageToBlock( 'core/gallery' );

		cy.get( '.has-lightbox' ).should( 'not.exist' );

		helpers.toggleSettingCheckbox( /Lightbox/ );

		cy.get( '.has-lightbox' ).should( 'exist' );

		cy.get( 'figure.wp-block-gallery img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.savePage();

		helpers.checkForBlockErrors( 'core/gallery' );

		helpers.viewPage();

		cy.get( 'figure.wp-block-gallery img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		cy.get( '.has-lightbox' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a gallery block to the content add image,
	 * and open Lightbox on Front-end when aligned
	 */
	[ 'left', 'center', 'right', 'wide', 'full' ].forEach( ( alignment ) => {
		return it( `Test ${ alignment } alignment core/gallery block with Lightbox Controls component.`, function() {
			const { imageBase } = helpers.upload.spec;
			helpers.addBlockToPost( 'core/gallery', true );

			helpers.upload.imageToBlock( 'core/gallery' );

			cy.get( '[aria-label="Change alignment"], [aria-label="Align"]' ).click();

			cy.get( '[aria-label="Change alignment"], [aria-label="Align"]' ).contains( new RegExp( alignment, 'i' ) ).click();

			helpers.toggleSettingCheckbox( /Lightbox/ );

			helpers.savePage();

			helpers.viewPage();

			cy.get( `figure[class*="align${ alignment }"] img[src*="http"][class^="wp-image-"]` ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			cy.get( '.coblocks-lightbox' ).should( 'be.hidden' );

			cy.get( `figure[class*="align${ alignment }"] img[src*="http"][class^="wp-image-"]` ).click( { force: true } );

			cy.get( '.coblocks-lightbox' ).should( 'be.visible' );

			helpers.editPage();
		} );
	} );
} );

/*
 * Include our constants
 */
import * as helpers from '../../../.dev/tests/cypress/helpers';

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
	 * Test that we can add a gallery block to the content add image,
	 * and alter image using the Lightbox Controls extension
	 */
	it( 'Test core/gallery block extends with Lightbox Controls component.', function() {
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
} );

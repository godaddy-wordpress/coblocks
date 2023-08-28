/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Lightbox Controls extension on core/masonry', function() {
	/**
	 * Test that we can add a image block to the content add image,
	 * and alter image using the Lightbox Controls extension
	 */
	it( 'Test coblocks/gallery-masonry block extends with Lightbox Controls component.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

		helpers.upload.imageToBlock( 'coblocks/gallery-masonry' );

		cy.get( '.has-lightbox' ).should( 'not.exist' );

		helpers.savePage();

		helpers.selectBlock( 'coblocks/gallery-masonry' );

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
	[ 'wide', 'full' ].forEach( ( alignment ) => {
		return it( `Test ${ alignment } alignment coblocks/gallery-masonry block with Lightbox Controls component.`, function() {
			const { imageBase } = helpers.upload.spec;
			helpers.addBlockToPost( 'coblocks/gallery-masonry', true );

			helpers.upload.imageToBlock( 'coblocks/gallery-masonry' );

			helpers.setBlockAlignment( alignment );

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

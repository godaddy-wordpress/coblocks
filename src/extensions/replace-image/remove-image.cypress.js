/*
 * Include our constants
 */
import * as helpers from '../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Replace Image extension', function() {
	/**
	 * Test that we can add a image block to the content add image,
	 * and alter image using the Replace Image extension
	 */
	it( 'Test core/image block extends with Replace Image component.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'core/image', true );

		cy.get( '.components-coblocks-replace-image' ).should( 'not.exist' );

		helpers.upload.imageToBlock( 'core/image' );

		cy.get( 'figure.wp-block-image img[src*="http"]' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		cy.get( '.components-coblocks-replace-image button' ).click();

		cy.get( '.media-modal-content' ).contains( /upload files/i );
		cy.get( '.media-modal-content' ).contains( /media library/i );
		cy.get( '.media-modal-content' ).find( '.attachments-browser' ).should( 'exist' );
	} );
} );

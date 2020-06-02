/*
 * Include our constants
 */
import * as helpers from '../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Replace Image extension', function() {
	/**
	 * Setup Gallery data
	 */
	const imageData = {
		fileName: '150x150.png',
		fileBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
	};

	/**
	 * Test that we can add a image block to the content add image,
	 * and alter image using the Replace Image extension
	 */
	it( 'Test core/image block extends with Replace Image component.', function() {
		const { fileName, fileBase, pathToFixtures } = imageData;
		helpers.addBlockToPost( 'core/image', true );

		cy.get( '.components-coblocks-replace-image' ).should( 'not.exist' );

		cy.fixture( pathToFixtures + fileName, 'base64' ).then( ( fileContent ) => {
			cy.get( 'div[data-type="core/image"]' )
				.find( 'div.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				);

			cy.get( 'figure.wp-block-image' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', fileBase );

			cy.get( '.components-coblocks-replace-image button' ).click();

			cy.get( '.media-modal-content' ).contains( /upload files/i );
			cy.get( '.media-modal-content' ).contains( /media library/i );
			cy.get( '.media-modal-content' ).find( '.attachments-browser' ).should( 'exist' );
		} );
	} );
} );

/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Media Text styles extension', function() {
	/**
	 * Test that we can add a media-text block as well as save and use alternate styles.
	 */
	it( 'Test core/media-text block extends with Media-Text styles extension.', function() {
		const { imageBase } = helpers.upload.spec;
		helpers.addBlockToPost( 'core/media-text', true );
		helpers.upload.imageToBlock( 'core/media-text' );

		const selectBlock = () => cy.get( `img[src*="${ imageBase }"]` ).click( { force: true } );

		cy.get( `img[src*="${ imageBase }"]` );

		cy.get( '.wp-block-media-text__content p' ).first().type( 'Content', { force: true } );

		selectBlock();

		if ( helpers.isWP62AtLeast() ) {
			helpers.setNewBlockStyle( 'card' );
		} else {
			helpers.setBlockStyle( 'card' );
		}

		cy.get( '.edit-post-visual-editor .wp-block-media-text.is-style-card' ).should( 'exist' );
		helpers.savePage();
		helpers.checkForBlockErrors( 'core/media-text' );
		helpers.viewPage();
		cy.get( '.wp-block-media-text.is-style-card' ).should( 'exist' );
		helpers.editPage();
		selectBlock();

		if ( helpers.isWP62AtLeast() ) {
			helpers.setNewBlockStyle( 'overlap' );
		} else {
			helpers.setBlockStyle( 'overlap' );
		}

		cy.get( '.edit-post-visual-editor .wp-block-media-text.is-style-overlap' ).should( 'exist' );
		helpers.savePage();
		helpers.checkForBlockErrors( 'core/media-text' );
		helpers.viewPage();
		cy.get( '.wp-block-media-text.is-style-overlap' ).should( 'exist' );
		helpers.editPage();
		selectBlock();

		if ( helpers.isWP62AtLeast() ) {
			helpers.setNewBlockStyle( 'outline' );
		} else {
			helpers.setBlockStyle( 'outline' );
		}

		cy.get( '.edit-post-visual-editor .wp-block-media-text.is-style-outline' ).should( 'exist' );
		helpers.savePage();
		helpers.checkForBlockErrors( 'core/media-text' );
		helpers.viewPage();
		cy.get( '.wp-block-media-text.is-style-outline' ).should( 'exist' );
		helpers.editPage();
	} );
} );

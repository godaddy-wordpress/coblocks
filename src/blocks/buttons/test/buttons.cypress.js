/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Buttons Block', function() {
	/**
	 * Test that we can add a buttons block to the content.
	 */
	it( 'Test buttons block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage();

		cy.get( '.edit-post-visual-editor' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:first-child .block-editor-rich-text__editable' ).type( 'Button 1' );
		cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:first-child input[aria-label="URL"]' ).type( 'https://www.google.com/1' );

		cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:last-child .block-editor-rich-text__editable' ).type( 'Button 2' );
		cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:last-child input[aria-label="URL"]' ).type( 'https://www.google.com/2' );

		helpers.savePage();

		helpers.checkForBlockErrors();

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-buttons' )
			.should( 'exist' );

		cy.get( '.wp-block-coblocks-buttons .wp-block-button:first-child .wp-block-button__link' )
			.contains( 'Button 1' )
			.and( 'have.attr', 'href' )
			.and( 'match', /https:\/\/www.google.com\/1/ );

		cy.get( '.wp-block-coblocks-buttons .wp-block-button:last-child .wp-block-button__link' )
			.contains( 'Button 2' )
			.and( 'have.attr', 'href' )
			.and( 'match', /https:\/\/www.google.com\/2/ );

		helpers.editPage();
	} );
} );

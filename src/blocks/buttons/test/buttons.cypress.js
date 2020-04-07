/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Buttons Block', function() {
	/**
	 * Test a custom class for the buttons block.
	 */
	let buttonsBlockIsDeprecated = false;

	before(function() {
		cy.get( '.block-list-appender .wp-block .block-editor-inserter__toggle' ).click()
		cy.get( '.block-editor-inserter__menu input' ).type( 'buttons' ).then( () => {
			buttonsBlockIsDeprecated = Cypress.$('.editor-block-list-item-coblocks-buttons').length === 0;
			cy.get( 'textarea[aria-label="Add block"]' ).click();
		} );
	})

	it( 'Test buttons style classes are applied in the editor.', function() {
		if ( ! buttonsBlockIsDeprecated ) {
			helpers.addBlockToPost( 'coblocks/buttons', true )
			cy.get( '.edit-post-visual-editor' ).click( { force: true } );

			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:first-child .block-editor-rich-text__editable' ).type( 'Button 1' );
			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:first-child input[aria-label="URL"]' ).type( 'https://www.google.com/1' );

			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:last-child .block-editor-rich-text__editable' ).type( 'Button 2' );
			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:last-child input[aria-label="URL"]' ).type( 'https://www.google.com/2' );

			helpers.addCustomBlockClass( 'my-custom-class', 'buttons' );

			helpers.savePage();

			helpers.checkForBlockErrors( 'coblocks/buttons' );

			helpers.viewPage();

			cy.get( '.wp-block-coblocks-buttons' )
				.should( 'have.class', 'my-custom-class' );

			helpers.editPage();
		}
	} );

	/**
	 * Test that we can add a buttons block to the content.
	 */
	it( 'Test buttons block is not visible when empty values are saved.', function() {
		if ( ! buttonsBlockIsDeprecated ) {
			helpers.addBlockToPost( 'coblocks/buttons', true )
			cy.get( '.edit-post-visual-editor' ).click( { force: true } );

			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:first-child .block-editor-rich-text__editable' ).type( 'Button 1' );
			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:first-child input[aria-label="URL"]' ).type( 'https://www.google.com/1' );

			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:last-child .block-editor-rich-text__editable' ).type( 'Button 2' );
			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:last-child input[aria-label="URL"]' ).type( 'https://www.google.com/2' );

			helpers.savePage();

			helpers.checkForBlockErrors( 'coblocks/buttons' );

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
		}
	} );

	/**
	 * Test that we can add 4 buttons in the button block to the content.
	 */
	it( 'Test buttons block saves with empty values.', function() {
		if ( ! buttonsBlockIsDeprecated ) {
			helpers.addBlockToPost( 'coblocks/buttons', true )
			cy.get( '.wp-block-coblocks-buttons' ).click( { force: true } );

			cy.get( '.components-range-control__number' ).clear().type( '3' );

			cy.get( '.edit-post-visual-editor' ).click( { force: true } );

			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:nth-child(1) .block-editor-rich-text__editable' ).type( 'Button 1' );
			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:nth-child(1) input[aria-label="URL"]' ).type( 'https://www.google.com/1' );

			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:nth-child(2) .block-editor-rich-text__editable' ).type( 'Button 2' );
			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:nth-child(2) input[aria-label="URL"]' ).type( 'https://www.google.com/2' );

			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:nth-child(3) .block-editor-rich-text__editable' ).type( 'Button 3' );
			cy.get( '.wp-block-coblocks-buttons .block-editor-block-list__block:nth-child(3) input[aria-label="URL"]' ).type( 'https://www.google.com/3' );

			helpers.savePage();

			helpers.checkForBlockErrors( 'coblocks/buttons' );

			helpers.viewPage();

			cy.get( '.wp-block-coblocks-buttons' )
				.should( 'exist' );

			cy.get( '.wp-block-coblocks-buttons .wp-block-button:nth-child(1) .wp-block-button__link' )
				.contains( 'Button 1' )
				.and( 'have.attr', 'href' )
				.and( 'match', /https:\/\/www.google.com\/1/ );

			cy.get( '.wp-block-coblocks-buttons .wp-block-button:nth-child(2) .wp-block-button__link' )
				.contains( 'Button 2' )
				.and( 'have.attr', 'href' )
				.and( 'match', /https:\/\/www.google.com\/2/ );

			cy.get( '.wp-block-coblocks-buttons .wp-block-button:nth-child(3) .wp-block-button__link' )
				.contains( 'Button 3' )
				.and( 'have.attr', 'href' )
				.and( 'match', /https:\/\/www.google.com\/3/ );

			helpers.editPage();
		}
	} );
} );

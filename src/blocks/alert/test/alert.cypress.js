/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Alert Block', function() {
	/**
	 * Test that we can add a alert block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test alert block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/alert', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/alert' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-alert' )
			.should( 'be.empty' );

		helpers.editPage();
	} );

	/**
	 * Test that alert data saves
	 */
	it( 'Test alert block saves and displays properly.', function() {
		helpers.addBlockToPost( 'coblocks/alert', true );

		cy.get( '.wp-block-coblocks-alert__title' )
			.type( 'Test Title' );

		cy.get( '.wp-block-coblocks-alert__text' )
			.type( 'Test text' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/alert' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-alert__title' )
			.should( 'not.be.empty' )
			.contains( 'Test Title' );

		cy.get( '.wp-block-coblocks-alert__text' )
			.should( 'not.be.empty' )
			.contains( 'Test text' );

		helpers.editPage();
	} );

	/**
	 * Test that the alert style classes are applied in the editor
	 */
	it( 'Test alert style classes are applied in the editor.', function() {
		helpers.addBlockToPost( 'coblocks/alert', true );

		cy.get( '.wp-block[data-type="coblocks/alert"]' )
			.click( 'right' );

		helpers.openSettingsPanel( 'Styles' );

		cy.get( '.block-editor-block-styles__item-label' )
			.contains( 'Info' )
			.click();

		cy.get( '.wp-block-coblocks-alert' )
			.should( 'have.class', 'is-style-info' );

		cy.get( '.block-editor-block-styles__item-label' )
			.contains( 'Success' )
			.click();

		cy.get( '.wp-block-coblocks-alert' )
			.should( 'have.class', 'is-style-success' );

		cy.get( '.block-editor-block-styles__item-label' )
			.contains( 'Warning' )
			.click();

		cy.get( '.wp-block-coblocks-alert' )
			.should( 'have.class', 'is-style-warning' );

		cy.get( '.block-editor-block-styles__item-label' )
			.contains( 'Error' )
			.click();

		cy.get( '.wp-block-coblocks-alert' )
			.should( 'have.class', 'is-style-error' );
	} );
} );

/* eslint-disable jest/valid-expect-in-promise */
// Disable reason: Cypress chained functions are not true promises and do not require a return.
// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Not-Promises
/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Icon Block', function() {
	/**
	 * Test the coblocks icon block.
	 */
	it( 'Test the icon block saves.', function() {
		helpers.addBlockToPost( 'coblocks/icon', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/icon' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-icon' )
			.should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks icon block style.
	 */
	it( 'Test the icon block style.', function() {
		helpers.addBlockToPost( 'coblocks/icon', true );

		cy.contains( 'Styles' );

		helpers.openSettingsPanel( 'Styles' );

		cy.get( '.block-editor-block-styles__item[aria-label="Filled"]' ).click();

		cy.get( '.wp-block-coblocks-icon' ).should( 'have.class', 'is-style-filled' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/icon' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-icon' )
			.should( 'exist' );

		cy.get( '.wp-block-coblocks-icon' ).should( 'have.class', 'is-style-filled' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks icon block resize.
	 */
	it( 'Test the icon block resize and change icon.', function() {
		helpers.addBlockToPost( 'coblocks/icon', true );

		cy.get( '.components-base-control__label' ).contains( 'Size' ).then( ( $settingLabel ) => {
			cy.get( Cypress.$( $settingLabel ).next().find( 'select' ) ).select( 'huge' );
		} );

		cy.get( '.wp-block-coblocks-icon__inner' ).should( 'have.css', 'width', '200px' );

		cy.get( '.components-base-control__label' ).contains( 'Icon search' ).then( ( $settingLabel ) => {
			cy.get( Cypress.$( $settingLabel ).next() ).type( 'world' );
		} );

		cy.get( 'ul.block-editor-block-types-list li:first-child' ).click();

		cy.get( '.wp-block-coblocks-icon__inner svg path' ).should( 'have.attr', 'd', 'm10 0c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-8 10c0-.61.08-1.21.21-1.78l4.78 4.78v1c0 1.1.9 2 2 2v1.93c-3.93-.5-6.99-3.86-6.99-7.93zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-.41c2.93 1.18 5.01 4.06 5.01 7.41 0 2.08-.81 3.98-2.11 5.4z' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/icon' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-icon' )
			.should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks icon block link settings.
	 */
	it( 'Test the icon block link settings.', function() {
		helpers.addBlockToPost( 'coblocks/icon', true );

		cy.contains( 'Link settings' );

		helpers.openSettingsPanel( 'Link settings' );

		cy.get( '.components-base-control__label' ).contains( 'Link URL' ).then( ( $settingLabel ) => {
			cy.get( Cypress.$( $settingLabel ).next() ).type( 'https://www.google.com' );
		} );

		cy.get( '.components-base-control__label' ).contains( 'Link rel' ).then( ( $settingLabel ) => {
			cy.get( Cypress.$( $settingLabel ).next() ).type( 'Link rel' );
		} );

		cy.get( '.components-toggle-control__label' ).contains( 'Open in new tab' ).then( ( $settingLabel ) => {
			cy.get( Cypress.$( $settingLabel ).closest( '.components-base-control__field' ).find( '.components-form-toggle' ) ).click();
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/icon' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-icon__inner a' )
			.should( 'have.attr', 'href', 'https://www.google.com' )
			.and( 'have.attr', 'rel', 'Link rel noreferrer noopener' )
			.and( 'have.attr', 'target', '_blank' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks icon block color settings.
	 */
	it( 'Test the icon block color settings.', function() {
		helpers.addBlockToPost( 'coblocks/icon', true );

		cy.contains( 'Color settings' );

		helpers.openSettingsPanel( 'Color settings' );

		helpers.setColorSetting( 'background', '#e60099' );
		helpers.setColorSetting( 'icon color', '#55e7ff' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/icon' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-icon__inner' )
			.should( 'have.css', 'color', 'rgb(85, 231, 255)' )
			.and( 'have.css', 'background-color', 'rgb(230, 0, 153)' );

		helpers.editPage();
	} );

	it( 'Test the icon block custom class.', function() {
		helpers.addBlockToPost( 'coblocks/icon', true );

		// Make sure that controls who are lazy loaded finished loading
		cy.contains( 'Icon settings' );

		cy.get( '.components-panel__body-title' ).contains( 'Icon settings' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.addCustomBlockClass( 'my-custom-class', 'icon' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/icon' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-icon' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Share Block', function() {
	/**
	 * Test the coblocks share block.
	 */
	it( 'Test the share block saves.', function() {
		helpers.addBlockToPost( 'coblocks/social', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social' )
			.should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block colors.
	 * Go traditional style default color: rgb(200, 106, 25)
	 */
	it( 'Test the share block colors.', function() {
		helpers.addBlockToPost( 'coblocks/social', true );

		helpers.toggleSettingCheckbox( 'Social colors' );

		cy.get( '.block-editor-writing-flow .wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'background-color', 'rgb(200, 106, 25)' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'background-color', 'rgb(200, 106, 25)' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block rounded corners.
	 */
	it( 'Test the share block rounded corners.', function() {
		helpers.addBlockToPost( 'coblocks/social', true );

		helpers.toggleSettingCheckbox( 'Social colors' );

		cy.get( 'input[aria-label="Rounded corners"][type="number"]' ).focus().type( '{selectall}10' );

		if ( Cypress.browser.name === 'chrome' ) {
			cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
				.should( 'have.css', 'border-radius', '10px' );
		} else if ( Cypress.browser.name === 'firefox' ) {
			cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
				.should( 'have.css', 'border-bottom-left-radius', '10px' )
				.should( 'have.css', 'border-bottom-right-radius', '10px' )
				.should( 'have.css', 'border-top-right-radius', '10px' )
				.should( 'have.css', 'border-top-left-radius', '10px' );
		}

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social' );

		helpers.viewPage();

		if ( Cypress.browser.name === 'chrome' ) {
			cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
				.should( 'have.css', 'border-radius', '10px' );
		} else if ( Cypress.browser.name === 'firefox' ) {
			cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
				.should( 'have.css', 'border-bottom-left-radius', '10px' )
				.should( 'have.css', 'border-bottom-right-radius', '10px' )
				.should( 'have.css', 'border-top-right-radius', '10px' )
				.should( 'have.css', 'border-top-left-radius', '10px' );
		}
		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block button size.
	 */
	it( 'Test the share block button size.', function() {
		helpers.addBlockToPost( 'coblocks/social', true );

		helpers.toggleSettingCheckbox( 'Social colors' );

		cy.get( '.components-coblocks-inspector__social-button-size select' )
			.select( 'lrg' );

		cy.get( '.has-button-size-lrg' ).should( 'exist' );

		cy.get( '.components-coblocks-inspector__social-button-size select' )
			.select( 'sml' );

		cy.get( '.has-button-size-sml' ).should( 'exist' );

		cy.get( '.components-coblocks-inspector__social-button-size select' )
			.select( 'med' );

		cy.get( '.has-button-size-med' ).should( 'exist' );
	} );

	/**
	 * Test the coblocks share block social network visibility using sidebar toggle.
	 */
	it( 'Test the share block social network visibility using sidebar toggle.', function() {
		helpers.addBlockToPost( 'coblocks/social', true );

		helpers.toggleSocialNetwork( 'LinkedIn' );
		helpers.toggleSocialNetwork( 'Email' );
		helpers.toggleSocialNetwork( 'Tumblr' );
		helpers.toggleSocialNetwork( 'Google' );
		helpers.toggleSocialNetwork( 'Reddit' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:nth-child(1) .wp-block-coblocks-social__text' ).contains( 'Share on Facebook' );
		cy.get( '.wp-block-coblocks-social li:nth-child(2) .wp-block-coblocks-social__text' ).contains( 'Share on Twitter' );
		cy.get( '.wp-block-coblocks-social li:nth-child(3) .wp-block-coblocks-social__text' ).contains( 'Share on Pinterest' );
		cy.get( '.wp-block-coblocks-social li:nth-child(4) .wp-block-coblocks-social__text' ).contains( 'Share on Linkedin' );
		cy.get( '.wp-block-coblocks-social li:nth-child(5) .wp-block-coblocks-social__text' ).contains( 'Share via Email' );
		cy.get( '.wp-block-coblocks-social li:nth-child(6) .wp-block-coblocks-social__text' ).contains( 'Share on Tumblr' );
		cy.get( '.wp-block-coblocks-social li:nth-child(7) .wp-block-coblocks-social__text' ).contains( 'Share on Google' );
		cy.get( '.wp-block-coblocks-social li:nth-child(8) .wp-block-coblocks-social__text' ).contains( 'Share on Reddit' );

		helpers.editPage();

		cy.get( '.wp-block-coblocks-social' ).click( { force: true } );

		helpers.toggleSocialNetwork( 'Twitter' );
		helpers.toggleSocialNetwork( 'Facebook' );
		helpers.toggleSocialNetwork( 'Pinterest' );
		helpers.toggleSocialNetwork( 'LinkedIn' );
		helpers.toggleSocialNetwork( 'Email' );
		helpers.toggleSocialNetwork( 'Tumblr' );
		helpers.toggleSocialNetwork( 'Google' );

		helpers.savePage();

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:nth-child(1) .wp-block-coblocks-social__text' ).contains( 'Share on Reddit' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block social network visibility using click toggle.
	 */
	it( 'Test the share block social network visibility using click toggle.', function() {
		helpers.addBlockToPost( 'coblocks/social', true );

		cy.get( '.wp-block-coblocks-social__button--linkedin' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--email' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--tumblr' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--google' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--reddit' ).first().click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:nth-child(1) .wp-block-coblocks-social__text' ).contains( 'Share on Facebook' );
		cy.get( '.wp-block-coblocks-social li:nth-child(2) .wp-block-coblocks-social__text' ).contains( 'Share on Twitter' );
		cy.get( '.wp-block-coblocks-social li:nth-child(3) .wp-block-coblocks-social__text' ).contains( 'Share on Pinterest' );
		cy.get( '.wp-block-coblocks-social li:nth-child(4) .wp-block-coblocks-social__text' ).contains( 'Share on Linkedin' );
		cy.get( '.wp-block-coblocks-social li:nth-child(5) .wp-block-coblocks-social__text' ).contains( 'Share via Email' );
		cy.get( '.wp-block-coblocks-social li:nth-child(6) .wp-block-coblocks-social__text' ).contains( 'Share on Tumblr' );
		cy.get( '.wp-block-coblocks-social li:nth-child(7) .wp-block-coblocks-social__text' ).contains( 'Share on Google' );
		cy.get( '.wp-block-coblocks-social li:nth-child(8) .wp-block-coblocks-social__text' ).contains( 'Share on Reddit' );

		helpers.editPage();

		cy.get( '.wp-block-coblocks-social' ).first().click( { force: true } );

		cy.get( '.wp-block-coblocks-social__button--twitter' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--facebook' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--pinterest' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--linkedin' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--email' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--tumblr' ).first().click();
		cy.get( '.wp-block-coblocks-social__button--google' ).first().click();

		helpers.savePage();

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:nth-child(1) .wp-block-coblocks-social__text' ).contains( 'Share on Reddit' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block custom classes & top/bottom spacing.
	 */
	it( 'Test the share block custom classes and top/bottom spacing.', function() {
		helpers.addBlockToPost( 'coblocks/social', true );

		cy.get( '.components-panel__body-title' ).contains( 'Icon settings' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.addCustomBlockClass( 'my-custom-class', 'social' );

		helpers.toggleSettingCheckbox( 'Remove top spacing' );
		helpers.toggleSettingCheckbox( 'Remove bottom spacing' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

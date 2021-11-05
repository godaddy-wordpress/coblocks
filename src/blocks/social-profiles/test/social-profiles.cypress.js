/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Social Profiles Block', function() {
	/**
	 * Test the coblocks social profiles block saves.
	 */
	it( 'Test the social profiles block saves.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Twitter profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.twitter.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Instagram profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.instagram.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add TikTok profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.tiktok.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Pinterest profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.pinterest.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add LinkedIn profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.linkedin.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add YouTube profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.youtube.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Yelp profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.yelp.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Houzz profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.houzz.com/test' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles ul li' )
			.its( 'length' )
			.should( 'equal', 9 );

		cy.get( 'a[title="Facebook"]' )
			.should( 'have.attr', 'href', 'https://www.facebook.com/test' );

		cy.get( 'a[title="Twitter"]' )
			.should( 'have.attr', 'href', 'https://www.twitter.com/test' );

		cy.get( 'a[title="Instagram"]' )
			.should( 'have.attr', 'href', 'https://www.instagram.com/test' );

		cy.get( 'a[title="TikTok"]' )
			.should( 'have.attr', 'href', 'https://www.tiktok.com/test' );

		cy.get( 'a[title="Pinterest"]' )
			.should( 'have.attr', 'href', 'https://www.pinterest.com/test' );

		cy.get( 'a[title="Linkedin"]' )
			.should( 'have.attr', 'href', 'https://www.linkedin.com/test' );

		cy.get( 'a[title="YouTube"]' )
			.should( 'have.attr', 'href', 'https://www.youtube.com/test' );

		cy.get( 'a[title="Yelp"]' )
			.should( 'have.attr', 'href', 'https://www.yelp.com/test' );

		cy.get( 'a[title="Houzz"]' )
			.should( 'have.attr', 'href', 'https://www.houzz.com/test' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles block saves with opensInNewTab.
	 */
	it( 'Test the social profiles block allows links in new tabs.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		helpers.toggleSettingCheckbox( 'Open links in new tab' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles ul li' )
			.its( 'length' )
			.should( 'equal', 1 );

		cy.get( 'a[title="Facebook"]' )
			.should( 'have.attr', 'href', 'https://www.facebook.com/test' )
			.should( 'have.attr', 'target', '_blank' )
			.should( 'have.attr', 'rel', 'noopener noreferrer' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles block styles.
	 */
	it.skip( 'Test the social profiles block styles.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(1)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-mask' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-mask' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).first().click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(2)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).first().click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(3)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-text' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-text' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).first().click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(4)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon-and-text' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon-and-text' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).first().click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(5)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-circular' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-circular' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles colors.
	 * Go traditional style default color: rgb(200, 106, 25)
	 */
	it.skip( 'Test the social profiles colors.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Icon settings' );
		helpers.toggleSettingCheckbox( 'Social colors' );

		cy.get( '.block-editor-writing-flow button[aria-label="Add Facebook profile"]' )
			.should( 'have.css', 'background-color', 'rgb(200, 106, 25)' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles ul li:first-child a' )
			.should( 'have.css', 'background-color', 'rgb(200, 106, 25)' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles rounded corners.
	 */
	it.skip( 'Test the social profiles rounded corners.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Icon settings' );

		cy.get( 'input[aria-label="Rounded corners"][type="number"]' ).focus().type( '{selectall}10' );

		if ( Cypress.browser.name === 'chrome' ) {
			cy.get( 'button[aria-label="Add Facebook profile"]' )
				.should( 'have.css', 'border-radius', '10px' );
		} else if ( Cypress.browser.name === 'firefox' ) {
			cy.get( 'button[aria-label="Add Facebook profile"]' )
				.should( 'have.css', 'border-bottom-left-radius', '10px' )
				.should( 'have.css', 'border-bottom-right-radius', '10px' )
				.should( 'have.css', 'border-top-right-radius', '10px' )
				.should( 'have.css', 'border-top-left-radius', '10px' );
		}

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		if ( Cypress.browser.name === 'chrome' ) {
			cy.get( '.wp-block-coblocks-social-profiles ul li:first-child a' )
				.should( 'have.css', 'border-radius', '10px' );
		} else if ( Cypress.browser.name === 'firefox' ) {
			cy.get( '.wp-block-coblocks-social-profiles ul li:first-child a' )
				.should( 'have.css', 'border-bottom-left-radius', '10px' )
				.should( 'have.css', 'border-bottom-right-radius', '10px' )
				.should( 'have.css', 'border-top-right-radius', '10px' )
				.should( 'have.css', 'border-top-left-radius', '10px' );
		}

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles button size.
	 */
	it.skip( 'Test the social profiles button size.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Icon settings' );

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
	 * Test the coblocks social profiles links input fields.
	 */
	it.skip( 'Test the social profiles links input fields.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Profiles' );

		cy.get( '.components-social-links-list .components-base-control:nth-child(6) input' )
			.type( 'https://www.linkedin.com/test' );

		cy.get( 'button[aria-label="Add LinkedIn profile"]' )
			.should( 'not.have.class', 'is-empty' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( 'a[title="Linkedin"]' )
			.should( 'exist' )
			.and( 'have.attr', 'href', 'https://www.linkedin.com/test' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles custom classes & top/bottom spacing.
	 */
	it.skip( 'Test the social profiles custom classes and top/bottom spacing.', function() {
		helpers.addBlockToPost( 'coblocks/social-profiles', true );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook profile"]' ).first().click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.addCustomBlockClass( 'my-custom-class', 'social-profiles' );

		helpers.toggleSettingCheckbox( 'Remove top spacing' );
		helpers.toggleSettingCheckbox( 'Remove bottom spacing' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/social-profiles' );

		helpers.viewPage();

		cy.get( 'div.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

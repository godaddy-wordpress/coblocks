/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Share Block', function() {
	/**
	 * Test the coblocks share block.
	 */
	it( 'Test the share block saves.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social' )
			.should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block colors.
	 */
	it( 'Test the share block colors.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social' );

		helpers.toggleSettingCheckbox( 'Social colors' );

		cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'background-color', 'rgb(49, 55, 60)' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'background-color', 'rgb(49, 55, 60)' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block rounded corners.
	 */
	it( 'Test the share block rounded corners.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social' );

		helpers.toggleSettingCheckbox( 'Social colors' );

		cy.get( 'input[aria-label="Rounded corners"]' )
			.clear()
			.type( '10' );

		cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'border-radius', '10px' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'border-radius', '10px' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block button size.
	 */
	it( 'Test the share block button size.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social' );

		helpers.toggleSettingCheckbox( 'Social colors' );

		cy.get( '.components-coblocks-inspector__social-button-size select' )
			.select( 'lrg' );

		cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'width', '84px' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:first-child .wp-block-coblocks-social__button' )
			.should( 'have.css', 'width', '66px' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block social network visibility.
	 */
	it( 'Test the share block social network visibility.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social' );

		toggleSocialNetwork( 'LinkedIn' );
		toggleSocialNetwork( 'Email' );
		toggleSocialNetwork( 'Tumblr' );
		toggleSocialNetwork( 'Google' );
		toggleSocialNetwork( 'Reddit' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social' );

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

		toggleSocialNetwork( 'Twitter' );
		toggleSocialNetwork( 'Facebook' );
		toggleSocialNetwork( 'Pinterest' );
		toggleSocialNetwork( 'LinkedIn' );
		toggleSocialNetwork( 'Email' );
		toggleSocialNetwork( 'Tumblr' );
		toggleSocialNetwork( 'Google' );

		helpers.savePage();

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social li:nth-child(1) .wp-block-coblocks-social__text' ).contains( 'Share on Reddit' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks share block custom classes & top/bottom spacing.
	 */
	it( 'Test the share block custom classes and top/bottom spacing.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social' );

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

		helpers.checkForBlockErrors( 'social' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

/**
 * Toggle a checkbox in the settings panel of the block editor
 *
 * @param {string} text The checkbox label text. eg: Facebook
 */
export function toggleSocialNetwork( text ) {
	cy.get( '.components-checkbox-control__label' )
		.contains( text )
		.parent( '.components-base-control__field' )
		.find( '.components-checkbox-control__input-container' )
		.click();
}

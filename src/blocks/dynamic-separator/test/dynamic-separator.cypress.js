/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Dynamic Separator Block', function() {
	/**
	 * Test that we can add a dynamic separator block to the page
	 */
	it( 'Test dynamic separator block saves properly.', function() {
		helpers.addBlockToPost( 'coblocks/dynamic-separator', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test dynamic separator styles
	 */
	it( 'Test dynamic separator styles.', function() {
		helpers.addBlockToPost( 'coblocks/dynamic-separator', true );

		helpers.openSettingsPanel( 'Styles' );

		cy.get( '.block-editor-block-styles__item-label, .block-editor-block-styles__item-text' )
			.contains( 'Line' )
			.click( { force: true } );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-line' );

		cy.get( '.block-editor-block-styles__item-label, .block-editor-block-styles__item-text' )
			.contains( /Dot|Default/ )
			.click( { force: true } );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-dots' );

		cy.get( '.block-editor-block-styles__item-label, .block-editor-block-styles__item-text' )
			.contains( 'Fullwidth' )
			.click( { force: true } );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-fullwidth' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-fullwidth' );

		helpers.editPage();
	} );

	/**
	 * Test dynamic separator styles
	 */
	it( 'Test dynamic separator colors.', function() {
		helpers.addBlockToPost( 'coblocks/dynamic-separator', true );

		helpers.setColorSettingsFoldableSetting( 'background', '#55e7ff' );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.css', 'color' )
			.and( 'equal', helpers.hexToRGB( '#55e7ff' ) );

		helpers.setColorSettingsFoldableSetting( 'background', '#f70479' );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.css', 'color' )
			.and( 'equal', helpers.hexToRGB( '#f70479' ) );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'has-background' )
			.and( 'have.css', 'color' )
			.and( 'equal', helpers.hexToRGB( '#f70479' ) );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a dynamic separator block to the page and alter it's height
	 */
	it( 'Test dynamic separator height increase.', function() {
		helpers.addBlockToPost( 'coblocks/dynamic-separator', true );

		helpers.openSettingsPanel( 'Dynamic Separator settings' );
		cy.get( '.components-panel__body.is-opened input[type="number"]' )
			.clear()
			.type( 200 );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.css', 'height' )
			.and( 'match', /200/ );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'exist' )
			.and( 'have.css', 'height' )
			.and( 'match', /200/ );

		helpers.editPage();
	} );

	/**
	 * Test dynamic separator custom class
	 */
	// pointer-events: none does not allow to click in addCustomBlockClass function
	it( 'Test dynamic separator custom class.', function() {
		helpers.addBlockToPost( 'coblocks/dynamic-separator', true );

		helpers.addCustomBlockClass( 'my-custom-class', 'dynamic-separator' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Hero Block', function() {
	// Setup Hero data.
	const heroData = {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	 * Test that we can add a hero block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test hero block saves without content.', function() {
		helpers.addBlockToPost( 'coblocks/hero', true );

		cy.get( '.wp-block-coblocks-hero' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/hero' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-hero' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a hero block to the content, adjust colors
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test hero block saves with color values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB } = heroData;
		helpers.addBlockToPost( 'coblocks/hero', true );

		cy.get( '.wp-block-coblocks-hero' ).click( { force: true } );

		helpers.setColorSetting( 'background color', backgroundColor );
		helpers.setColorSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/hero' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-hero' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-hero__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a hero block to the content, toggle fullscreen
	 * and are able to successfully save the block in fullscreen mode without errors.
	 */
	it( 'Test hero block saves with full screen set.', function() {
		helpers.addBlockToPost( 'coblocks/hero', true );

		helpers.toggleSettingCheckbox( /fullscreen/i );

		cy.get( '.wp-block-coblocks-hero' ).find( '.is-fullscreen' ).should( 'exist' );

		cy.get( '.edit-post-sidebar' ).find( 'div[aria-label="Select layout"]' ).children().each( ( $layoutButton ) => {
			cy.get( $layoutButton ).click();
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/hero' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-hero' ).find( '.is-fullscreen' ).should( 'exist' );

		helpers.editPage();
	} );
} );

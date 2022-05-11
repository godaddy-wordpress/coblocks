/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Hero Block', function() {
	// Setup Hero data.
	const heroData = {
		backgroundColor: '#ff0000',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColor: '#ffffff',
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

		helpers.selectBlock( 'hero' );

		cy.get( '[data-type="core/heading"]' ).focus().type( 'Heading Text' );
		cy.get( '[data-type="core/paragraph"]' ).first().focus().type( 'Paragraph Text' );

		cy.get( '.wp-block-coblocks-hero' ).click( { force: true } );

		helpers.setColorPanelSetting( 'background color', backgroundColor );
		helpers.setColorPanelSetting( 'text color', textColor );

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

	it( 'should close media upload flow on media selection', function() {
		helpers.addBlockToPost( 'coblocks/hero', true );

		helpers.selectBlock( 'hero' );

		cy.get( '.block-editor-block-toolbar .components-toolbar__control[aria-label="Add background image"]' ).click();

		const { pathToFixtures, fileName } = helpers.upload.spec;

		cy.fixture( pathToFixtures + fileName, { encoding: null } ).then( ( fileContent ) => {
			cy.get( '[class^="moxie"] [type="file"]' ).selectFile( { action: 'drag-drop', contents: fileContent, fileName: pathToFixtures + fileName, mimeType: 'image/png' }, { force: true } );
		} );

		cy.get( '.attachment.selected.save-ready' );
		cy.get( '.media-toolbar-primary > .button' ).click();

		//'.media-replace-flow button' was deprecated in 5.8.
		// Media replace button should reside as the 5th button within the toolbar.
		cy.get( '.block-editor-block-toolbar button:nth(4)' ).click();

		cy.get( '.components-popover__content' ).should( 'be.visible' );

		cy.get( '.block-editor-media-replace-flow__media-upload-menu .components-menu-item__button' ).contains( 'Open Media Library' ).click();

		cy.get( '.components-popover__content' ).should( 'not.be.visible' );
	} );
} );

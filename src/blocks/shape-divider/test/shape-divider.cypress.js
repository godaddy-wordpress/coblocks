/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Shape Divider Block', function() {
	/**
	 * Setup Shape Divider data
	 */
	const shapeDividerData = {
		shapeHeight: 200,
		backgroundHeight: 100,
		style: 'hills',
		backgroundColor: '#ff0000',
		shapeColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		shapeColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	 * Test that we can add a shape-divider block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test shape-divider block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/shape-divider', true );
		helpers.checkForBlockErrors( 'coblocks/shape-divider' );
	} );

	/**
	 * Test that we can add a shape-divider block to the content, adjust height
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test shape-divider block saves with height values set.', function() {
		const { shapeHeight, backgroundHeight } = shapeDividerData;
		helpers.addBlockToPost( 'coblocks/shape-divider', true );

		cy.get( '.edit-post-visual-editor .wp-block-coblocks-shape-divider' ).click();

		helpers.openSettingsPanel( 'Divider settings' );

		cy.get( '.edit-post-sidebar' )
			.contains( 'Shape height' ).not( '.block-editor-block-card__description' )
			.then( ( $settingSection ) => {
				cy.get( Cypress.$( $settingSection ).parent().parent() )
					.find( 'input[type="number"]' )
					.focus()
					.type( `{selectall}${ shapeHeight }` );
			} );

		cy.get( '.edit-post-sidebar' )
			.contains( 'Background height' ).not( '.block-editor-block-card__description' )
			.then( ( $settingSection ) => {
				cy.get( Cypress.$( $settingSection ).parent().parent() )
					.find( 'input[type="number"]' )
					.focus()
					.type( `{selectall}${ backgroundHeight }` );
			} );

		// helpers.setInputValue( 'divider settings', 'shape height', shapeHeight );
		// helpers.setInputValue( 'divider settings', 'background height', backgroundHeight );
		helpers.checkForBlockErrors( 'coblocks/shape-divider' );
	} );

	/**
	 * Test that we can add a shape-divider block to the content, adjust colors
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test shape-divider block saves with color values set.', function() {
		const { shapeColor, backgroundColor } = shapeDividerData;
		helpers.addBlockToPost( 'coblocks/shape-divider', true );

		cy.get( '.edit-post-visual-editor .wp-block-coblocks-shape-divider' ).click();
		helpers.setColorPanelSetting( 'shape color', shapeColor );
		helpers.setColorPanelSetting( 'background color', backgroundColor );
		helpers.checkForBlockErrors( 'coblocks/shape-divider' );
	} );

	/**
	 * Test that we can add a shape-divider block to the content, change style
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test shape-divider block saves with non-default style.', function() {
		const { style } = shapeDividerData;
		helpers.addBlockToPost( 'coblocks/shape-divider', true );

		cy.get( '.edit-post-visual-editor .wp-block-coblocks-shape-divider' ).click();

		helpers.setBlockStyle( style );
		helpers.checkForBlockErrors( 'coblocks/shape-divider' );
	} );
} );

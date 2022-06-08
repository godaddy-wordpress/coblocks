/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Row Block', function() {
	//setup row block data.
	const rowData = {
		backgroundColor: '#ff0000',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColor: '#ffffff',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	before( function() {
		helpers.addBlockToPost( 'coblocks/row', true );
	} );

	/**
	 * Test that we can add a row block to the content, select
	 * a single column and save content without errors.
	 */
	it( 'Test row block saves with one column.', function() {
		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/row' );

		helpers.addBlockToPost( 'coblocks/row', true );

		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(1) button' ).click();

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 1 );

		helpers.checkForBlockErrors( 'coblocks/row' );
	} );

	/**
	 * Test that we can add a row block to the content, select
	 * two columns and save content without errors.
	 */
	it( 'Test row block saves with two columns.', function() {
		helpers.addBlockToPost( 'coblocks/row', true );

		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(2) button' ).click();

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 2 );

		helpers.checkForBlockErrors( 'coblocks/row' );
	} );

	/**
	 * Test that we can add a row block to the content, select
	 * three columns and save content without errors.
	 */
	it( 'Test row block saves with three columns.', function() {
		helpers.addBlockToPost( 'coblocks/row', true );

		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(4) button' ).click();

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 3 );

		helpers.checkForBlockErrors( 'coblocks/row' );
	} );

	/**
	 * Test that we can add a row block to the content, select
	 * four columns and save content without errors.
	 */
	it( 'Test row block saves with four columns.', function() {
		helpers.addBlockToPost( 'coblocks/row', true );

		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(5) button' ).click();

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 4 );

		helpers.checkForBlockErrors( 'coblocks/row' );
	} );

	/**
	 * Test that we can add a row block to the content, adjust colors
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test row block saves with color values set.', function() {
		const { backgroundColor, textColor } = rowData;
		helpers.addBlockToPost( 'coblocks/row', true );

		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(1) button' ).click();

		cy.get( '.wp-block-coblocks-row' ).click( { force: true } );

		helpers.setColorSettingsFoldableSetting( 'background color', backgroundColor );
		helpers.setColorSettingsFoldableSetting( 'text color', textColor );

		helpers.checkForBlockErrors( 'coblocks/row' );
	} );

	/**
	 * Test the row block saves with custom classes
	 */
	it( 'Test the row block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/row', true );

		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(1) button' ).click();

		cy.get( '.wp-block-coblocks-row' ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).contains( /row settings/i ).click();

		helpers.addCustomBlockClass( 'my-custom-class', 'row' );

		helpers.checkForBlockErrors( 'coblocks/row' );

		cy.get( '.wp-block-coblocks-row' )
			.should( 'have.class', 'my-custom-class' );
	} );

	/**
	 * Test the row block saves with alignment classes
	 */
	it( 'Test the row block alignment controls.', function() {
		helpers.addBlockToPost( 'coblocks/row', true );

		cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(1) button' ).click();

		cy.get( '.wp-block-coblocks-row' ).click( { force: true } );

		cy.get( 'button[aria-label="Change vertical alignment"]' ).click();

		cy.get( 'div[aria-label="Change vertical alignment"]' ).find( 'button' ).contains( /top/i ).click();

		cy.get( '.wp-block-coblocks-row__inner' )
			.should( 'have.class', 'are-vertically-aligned-top' );

		cy.get( '.wp-block-coblocks-column' )
			.should( 'have.class', 'is-vertically-aligned-top' );

		cy.get( 'button[aria-label="Change vertical alignment"]' ).click();

		cy.get( 'div[aria-label="Change vertical alignment"]' ).find( 'button' ).contains( /middle/i ).click();

		cy.get( '.wp-block-coblocks-row__inner' )
			.should( 'have.class', 'are-vertically-aligned-center' );

		cy.get( '.wp-block-coblocks-column' )
			.should( 'have.class', 'is-vertically-aligned-center' );

		cy.get( 'button[aria-label="Change vertical alignment"]' ).click();

		cy.get( 'div[aria-label="Change vertical alignment"]' ).find( 'button' ).contains( /bottom/i ).click();

		cy.get( '.wp-block-coblocks-row__inner' )
			.should( 'have.class', 'are-vertically-aligned-bottom' );

		cy.get( '.wp-block-coblocks-column' )
			.should( 'have.class', 'is-vertically-aligned-bottom' );

		helpers.checkForBlockErrors( 'coblocks/row' );

		cy.get( '.wp-block-coblocks-row__inner' )
			.should( 'have.class', 'are-vertically-aligned-bottom' );

		cy.get( '.wp-block-coblocks-column' )
			.should( 'have.class', 'is-vertically-aligned-bottom' );
	} );
} );

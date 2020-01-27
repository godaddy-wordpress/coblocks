/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Row Block', function() {
	//setup row block data.
	const rowData = {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	* Test that we can add a row block to the content, select
	* two columns and save content without errors.
	*/
	it( 'Test row block saves with two columns.', function() {
		helpers.addCoBlocksBlockToPage( true, 'row' );

		cy.get( 'div[aria-label="Select Row Columns"]' ).find( 'div:nth-child(2)' ).click();
		cy.get( 'div[aria-label="Select Row Layout"]' ).find( 'div > button' ).first().click( { force: true } );

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 2 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'row' );

		helpers.viewPage();

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 2 );

		helpers.editPage();
	} );

	/**
	* Test that we can add a row block to the content, select
	* three columns and save content without errors.
	*/
	it( 'Test row block saves with three columns.', function() {
		helpers.addCoBlocksBlockToPage( true, 'row' );

		cy.get( 'div[aria-label="Select Row Columns"]' ).find( 'div:nth-child(3)' ).click();
		cy.get( 'div[aria-label="Select Row Layout"]' ).find( 'div > button' ).first().click( { force: true } );

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 3 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'row' );

		helpers.viewPage();

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 3 );

		helpers.editPage();
	} );

	/**
	* Test that we can add a row block to the content, select
	* four columns and save content without errors.
	*/
	it( 'Test row block saves with four columns.', function() {
		helpers.addCoBlocksBlockToPage( true, 'row' );

		cy.get( 'div[aria-label="Select Row Columns"]' ).find( 'div:nth-child(4)' ).click();
		cy.get( 'div[aria-label="Select Row Layout"]' ).find( 'div > button' ).first().click( { force: true } );

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 4 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'row' );

		helpers.viewPage();

		cy.get( 'div.wp-block-coblocks-column__inner' ).should( 'have.length', 4 );

		helpers.editPage();
	} );

	/**
    * Test that we can add a row block to the content, adjust colors
    * and are able to successfully save the block without errors.
	*/
	it( 'Test row block saves with color values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB } = rowData;
		helpers.addCoBlocksBlockToPage( true, 'row' );

		cy.get( 'div[aria-label="Select Row Columns"]' ).find( 'div:nth-child(1)' ).click();

		cy.get( '.wp-block-coblocks-row' ).click( { force: true } );

		helpers.setColorSetting( 'background color', backgroundColor );
		helpers.setColorSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'row' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-row' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-row__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );

	/**
	* Test the row block saves with custom classes
	*/
	it( 'Test the row block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'row' );

		cy.get( 'div[aria-label="Select Row Columns"]' ).find( 'div:nth-child(1)' ).click();

		cy.get( '.wp-block-coblocks-row' ).click( { force: true } );

		cy.get( '.edit-post-sidebar' ).contains( /row settings/i ).click();

		helpers.addCustomBlockClass( 'my-custom-class', 'row' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'row' );

		cy.get( '.wp-block-coblocks-row' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-row' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks column Block', function() {
	//setup column block data.
	const columnData = {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
    * Test that we can add a column block to the content, adjust colors
    * and are able to successfully save the block without errors.
	*/
	it( 'Test column block saves with color values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB } = columnData;
		helpers.addCoBlocksBlockToPage( true, 'row' );

		cy.get( 'div[aria-label="Select Row Columns"]' ).find( 'div:nth-child(1)' ).click();

		cy.get( '.wp-block-coblocks-column' ).last().click( { force: true } );

		helpers.setColorSetting( 'background color', backgroundColor );
		helpers.setColorSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'column' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-column' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-column__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );
} );

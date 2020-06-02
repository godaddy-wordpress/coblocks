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
	 * Conditionally run tests on Variation picker or Classic picker depending on availability.
	 * 
	 */
	let testAgainstVariationsPicker;
	before(function () {
		helpers.addBlockToPost('coblocks/row', true);
		cy.get('div[data-type="coblocks/row"]').then(() => {
			testAgainstVariationsPicker = Cypress.$('.block-editor-block-variation-picker').length > 0;
		})
	});

	/**
	 * Test that we can add a column block to the content, adjust colors
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test column block saves with color values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB } = columnData;
		helpers.addBlockToPost( 'coblocks/row', true );

		if ( testAgainstVariationsPicker ) {
			cy.get( '.block-editor-block-variation-picker__variations' ).find( 'li:nth-child(1) button' ).click( { force: true } );
		} else {
			cy.get( 'div[aria-label="Select row columns"]' ).find( 'div:nth-child(1) button' ).click( { force: true } );
		}

		cy.get( '.wp-block-coblocks-column' ).last().click( { force: true } );

		helpers.setColorSetting( 'background color', backgroundColor );
		helpers.setColorSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/column' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-column' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-column__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );
} );

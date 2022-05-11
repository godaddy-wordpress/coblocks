/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Pricing Table Item Block', function() {
	/**
	 * Setup Pricing Table Item data
	 */
	const pricingTableItemData = {
		amount: '33',
		backgroundColor: '#ff0000',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		buttonText: 'Consectetur.',
		currency: '$',
		features: 'Lorem ipsum dolor.',
		textColor: '#ffffff',
		textColorRGB: 'rgb(255, 255, 255)',
		title: 'Plan 1',
	};

	/**
	 * Test that we can add a pricing-table-item block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test pricing-table-item block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/pricing-table', true );

		helpers.checkForBlockErrors( 'coblocks/pricing-table-item' );
	} );

	/**
	 * Test that we can add a pricing-table block to the content, add text
	 * adjust colors and are able to successfully save the block without errors.
	 */
	it( 'Test pricing-table block saves with content values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB, title, currency, amount, features, buttonText } = pricingTableItemData;
		helpers.addBlockToPost( 'coblocks/pricing-table', true );

		const firstTableItem = () => {
			return cy.get( '.wp-block-coblocks-pricing-table-item' ).first();
		};

		firstTableItem().click();
		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__title' ).focus().type( `{selectall}${ title }` );
		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__currency' ).focus().type( `{selectall}${ currency }` );
		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__amount' ).focus().type( `{selectall}${ amount }` );
		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__features' ).focus().type( `{selectall} ${ features }` );
		firstTableItem().find( '.wp-block-button' ).find( 'div[role="textbox"]' ).focus().type( `{selectall}${ buttonText }` );

		firstTableItem().click( 'topRight' );
		helpers.setColorPanelSetting( 'background color', backgroundColor );
		helpers.setColorPanelSetting( 'text color', textColor );

		helpers.checkForBlockErrors( 'coblocks/pricing-table' );

		cy.get( '.wp-block-coblocks-pricing-table' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-pricing-table-item' ).first()
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__title' ).should( 'have.html', title );
		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__currency' ).should( 'have.html', currency );
		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__amount' ).should( 'have.html', amount );
		firstTableItem().find( '.wp-block-coblocks-pricing-table-item__features > li' ).should( 'have.html', features );
		firstTableItem().find( '.wp-block-button' ).should( 'have.text', buttonText );
	} );
} );

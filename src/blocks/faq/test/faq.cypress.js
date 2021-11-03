/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Block: FAQ', () => {
	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/faq', true );
	} );

	/**
	 * Test that we can add a FAQ item to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'can be inserted without errors', () => {
		cy.get( '[data-type="coblocks/faq"]' ).should( 'exist' );
		helpers.checkForBlockErrors( 'coblocks/faq' );
	} );

	/**
	 * Test that we can add a FAQ item to the page, add content to it,
	 * save and it displays properly without errors.
	 */
	it( 'can be modified without errors', () => {
		cy.get( '[data-type="coblocks/faq"] .wp-block-coblocks-faq__title' ).type( 'title' );
		helpers.checkForBlockErrors( 'coblocks/faq' );
	} );

	/**
	 * Test that multiple faq items display as expected
	 */
	it( 'can add multiple faq item blocks', () => {
		cy.get( '[data-type="coblocks/faq"]' ).click( 'top', { force: true } );

		cy.get( '.coblocks-block-appender button' ).eq( 0 ).click();

		cy.get( '[data-type="coblocks/faq"]' ).find( '[data-type="coblocks/faq-item"]' ).should( 'have.length', 2 );

		helpers.checkForBlockErrors( 'coblocks/faq' );
	} );

	/**
	 * Test that we can add category title and it displays as expected
	 */
	it( 'can add category title and displays as expected', () => {
		cy.get( '[data-type="coblocks/faq"]' ).find( '.wp-block-coblocks-faq__heading ' ).should( 'have.length', 0 );

		cy.get( '[data-type="coblocks/faq"]' ).click( 'top', { force: true } );

		cy.get( '.coblocks-block-appender button' ).eq( 1 ).click();

		cy.get( '[data-type="coblocks/faq"]' ).find( '.wp-block-coblocks-faq__heading ' ).should( 'have.length', 1 );

		helpers.checkForBlockErrors( 'coblocks/faq' );
	} );

	/**
	 * Test the accordion block color settings
	 */
	it( 'can apply color settings', () => {
		cy.get( '[data-type="coblocks/faq-item"] .wp-block-coblocks-faq-item__question__content' ).type( 'Question' );

		// Title - Text color
		helpers.setColorSetting( 'text', '#FFFFFF' );
		cy.get( '[data-type="coblocks/faq-item"] .wp-block-coblocks-faq-item__question__content' ).should( 'have.css', 'color', `rgb(255, 255, 255)` );

		helpers.checkForBlockErrors( 'coblocks/faq' );
	} );

	/**
	 * Test the accordion block custom classes
	 */
	it( 'can have custom classes', () => {
		cy.get( '[data-type="coblocks/faq-item"]' ).first().click();
		helpers.addCustomBlockClass( 'my-custom-class', 'faq-item' );

		helpers.checkForBlockErrors( 'coblocks/faq' );

		cy.get( '.wp-block-coblocks-faq-item' )
			.should( 'have.class', 'my-custom-class' );
	} );
} );

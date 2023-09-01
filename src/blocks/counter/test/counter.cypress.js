/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Counter Block', function() {
	/**
	 * Setup counter data
	 */
	const counterData = {
		counterDescription: 'Always always tested 1000 times',
		counterSpeed: 5,
		counterText: '10000 hours{enter}20000 years',
	};

	/**
	 * Test that we can add a counter block to the content, not add any content or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test counter block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/counter', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/counter' );
	} );

	/**
	 * Test that we can add counter block text and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test counter block saves with text content.', function() {
		helpers.addBlockToPost( 'coblocks/counter', true );

		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().focus().type( counterData.counterText );
		cy.get( '.wp-block-coblocks-counter.rich-text' ).last().focus().type( counterData.counterDescription );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/counter' );
	} );

	/**
	 * Test that we can add counter block and set a custom counter speed
	 * and save without errors.
	 */
	it( 'Test counter block saves with custom counter speed.', function() {
		helpers.addBlockToPost( 'coblocks/counter', true );

		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().focus().type( counterData.counterText );
		cy.get( '.wp-block-coblocks-counter.rich-text' ).last().focus().type( counterData.counterDescription );
		cy.get( '.wp-block-coblocks-counter[data-counter-speed="1"]' );

		helpers.selectBlock( 'counter' );
		helpers.setInputValue( 'counter settings', 'seconds until counter completes', counterData.counterSpeed, true );

		cy.get( `.wp-block-coblocks-counter[data-counter-speed="${ counterData.counterSpeed }"]` );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/counter' );
	} );

	/**
	 * Test that we can add counter block and use the icon block controls
	 * and save block without errors.
	 */
	it( 'Test counter block allows user to add icon block.', function() {
		helpers.addBlockToPost( 'coblocks/counter', true );

		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().focus().type( counterData.counterText );
		cy.get( '.wp-block-coblocks-counter.rich-text' ).last().focus().type( counterData.counterDescription );
		cy.get( '[data-type="coblocks/icon"]' ).should( 'not.exist' );

		helpers.selectBlock( 'counter' );
		helpers.toggleSettingCheckbox( 'Show Icon Block', );

		helpers.selectBlock( 'icon' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/counter' );
	} );

	/**
	 * Test that we can add counter block and use locale formatting controls
	 * and save block without errors.
	 */
	it( 'Test counter block allows user to use locale formatting.', function() {
		helpers.addBlockToPost( 'coblocks/counter', true );

		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().focus().type( counterData.counterText );
		cy.get( '.wp-block-coblocks-counter.rich-text' ).last().focus().type( counterData.counterDescription );
		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().contains( '10000 hours' );

		helpers.selectBlock( 'counter' );
		helpers.toggleSettingCheckbox( 'Locale number formatting', );

		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().contains( '10,000 hours' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/counter' );
	} );

	/**
	 * Test that we can add counter block and use locale formatting controls
	 * and save block without errors.
	 */
	it( 'Test counter block properly enqueues its scripts.', function() {
		helpers.addBlockToPost( 'coblocks/counter', true );

		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().focus().type( counterData.counterText );
		cy.get( '.wp-block-coblocks-counter.rich-text' ).last().focus().type( counterData.counterDescription );
		cy.get( '.wp-block-coblocks-counter.rich-text' ).first().contains( '10000 hours' );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/counter' );

		helpers.viewPage();

		cy.get( "script[src*='coblocks-counter-script']" );

		helpers.editPage();
	} );
} );

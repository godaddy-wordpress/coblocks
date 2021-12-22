/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

// Enter a value here if you want to test the block with an API key
// For example : const API_KEY = 'AIzaSyC2wdYyKCl-pAiJzg6iWgS4K7nTxHVIUeP'; (not a real key)
const API_KEY = undefined;

describe( 'Test CoBlocks Map Block', function() {
	//setup map block data.
	const mapAddress = '10 First Street, SE Washington, DC 20540';

	/**
	 * Test that we can add a map block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'can save without content values set.', function() {
		helpers.addBlockToPost( 'coblocks/map', true );

		helpers.checkForBlockErrors( 'coblocks/map' );
	} );

	/**
	 * Test that we can add a map block to the content, add a map
	 * URL and save without any errors.
	 */
	it( 'can save with address.', function() {
		helpers.addBlockToPost( 'coblocks/map', true );

		cy.get( 'input[placeholder="Search for a place or address…"]' )
			.type( mapAddress )
			.parents( '.components-placeholder__fieldset' )
			.find( 'button' ).contains( /search/i ).click();

		helpers.checkForBlockErrors( 'coblocks/map' );

		cy.get( '.wp-block-coblocks-map' ).should( 'exist' );
	} );

	/**
	 * Test the map block saves height set
	 */
	it( 'can use block height controls.', function() {
		helpers.addBlockToPost( 'coblocks/map', true );

		cy.get( 'input[placeholder="Search for a place or address…"]' )
			.type( mapAddress )
			.parents( '.components-placeholder__fieldset' )
			.find( 'button' ).contains( /search/i ).click();

		helpers.setInputValue( 'map settings', 'height in pixels', 800 );

		cy.get( 'div[data-type="coblocks/map"]' ).find( '.is-selected' ).should( 'have.css', 'height', '800px' );

		helpers.checkForBlockErrors( 'coblocks/map' );
	} );

	/**
	 * Test the map block custom classes
	 */
	it( 'can have custom classes', () => {
		helpers.addBlockToPost( 'coblocks/map', true );

		cy.get( 'input[placeholder="Search for a place or address…"]' )
			.type( mapAddress )
			.parents( '.components-placeholder__fieldset' )
			.find( 'button' ).contains( /search/i ).click();

		helpers.addCustomBlockClass( 'my-custom-class', 'map' );

		cy.get( '.wp-block-coblocks-map' ).should( 'have.class', 'my-custom-class' );

		helpers.checkForBlockErrors( 'coblocks/map' );
	} );

	if ( API_KEY ) {
		it( 'renders a map when the user has an API key', () => {
			helpers.addBlockToPost( 'coblocks/map', true );

			cy.get( 'input[placeholder="Search for a place or address…"]' )
				.type( mapAddress )
				.parents( '.components-placeholder__fieldset' )
				.find( 'button' ).contains( /search/i ).click();

			cy.contains( 'Google Maps API key' );

			helpers.openSettingsPanel( 'Google Maps API key' );

			cy.get( '.components-block-coblocks-map-api-key__custom-input input' )
				.clear()
				.type( API_KEY );

			helpers.savePage();

			helpers.checkForBlockErrors( 'coblocks/map' );

			helpers.viewPage();

			cy.get( '.wp-block-coblocks-map' ).should( 'exist' );
		} );
	}
} );

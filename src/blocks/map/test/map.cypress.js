/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Map Block', function() {
	//setup map block data.
	const mapAddress = '10 First Street, SE Washington, DC 20540';

	/**
	 * Test that we can add a map block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test map block saves without content values set.', function() {
		helpers.addBlockToPost( 'coblocks/map', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/map' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-map' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a map block to the content, add a map
	 * URL and save without any errors.
	 */
	it( 'Test map block saves with address.', function() {
		helpers.addBlockToPost( 'coblocks/map', true );

		cy.get( 'input[placeholder="Search for a place or address…"]' )
			.type( mapAddress )
			.parents( '.components-placeholder__fieldset' )
			.find( 'button' ).contains( /apply/i ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/map' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-map' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test the map block saves height set
	 */
	it( 'Test the map block height controls.', function() {
		helpers.addBlockToPost( 'coblocks/map', true );

		cy.get( 'input[placeholder="Search for a place or address…"]' )
			.type( mapAddress )
			.parents( '.components-placeholder__fieldset' )
			.find( 'button' ).contains( /apply/i ).click();

		helpers.setInputValue( 'map settings', 'height in pixels', 800 );

		cy.get( 'div[data-type="coblocks/map"]' ).find( '.is-selected' ).should( 'have.css', 'height', '800px' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/map' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-map' ).should( 'have.css', 'min-height', '800px' );

		helpers.editPage();
	} );
} );

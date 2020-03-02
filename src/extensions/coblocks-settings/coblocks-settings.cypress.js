/*
 * Include our constants
 */
import * as helpers from '../../../.dev/tests/cypress/helpers';

describe( 'Extension: CoBlocks Settings', function() {
	// /**
	//  * Test that the CoBlocks panel may be hidden
	//  */
	// it( 'Can be filtered to be hidden.', function() {
	// 	helpers.addCoreBlockToPage( true, 'image' );

	// 	cy.get( '.replace-image-button' ).should( 'not.exist' );
	// } );

	// /**
	//  * Test that the CoBlocks panel may be renamed
	//  */
	// it( 'Can be filtered with a new title.', function() {
	// 	helpers.addCoreBlockToPage( true, 'image' );

	// 	cy.get( '.replace-image-button' ).should( 'not.exist' );
	// } );

	/**
	 * Test that the CoBlocks panel controls function as expected.
	 */
	it( 'Can control settings as expected.', function() {
		helpers.addCoBlocksBlockToPage( true, 'row' );
		cy.get( 'div[aria-label="Select Row Columns"]' ).find( 'div:nth-child(1) button' ).click( { force: true } );
		cy.get( '.wp-block-coblocks-row' ).click( { force: true } );
		helpers.openSettingsPanel( /color settings/i );

		cy.get( '.edit-post-more-menu' ).click();
		cy.get( '.components-menu-group' ).find( 'button' ).contains( 'Editor settings' ).click();
		//TODO: get all buttons, look for checked status, and make sure all are enabled before testing.

		cy.get( 'button[aria-label="Change typography"]' ).should( 'exist' );
		cy.get( '.coblocks-modal__content' ).contains( 'Typography controls' ).click();
		cy.get( 'button[aria-label="Change typography"]' ).should( 'not.exist' );
	} );
} );

/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks OpenTable Block', function() {
	/**
	 * Test that we can add an OpenTable block to the content, not add anything and save the block
	 * without errors.
	 */
	// it( 'Test OpenTable block saves with empty values.', function() {
	// 	helpers.addBlockToPost( 'coblocks/opentable', true );

	// 	helpers.savePage();

	// 	helpers.checkForBlockErrors( 'coblocks/opentable' );

	// 	helpers.viewPage();

	// 	cy.get( '.wp-block-coblocks-opentable' ).should( 'not.exist' );

	// 	helpers.editPage();
	// } );

	/**
	 * Test that we can add an OpenTable block to the content, add a restaurant and then
	 * successfully save the block without errors. Then test going back to the block's edit state.
	 */
	it( 'Test OpenTable block saves with single restaurant selection then test going back to the block edit state.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		cy.get( '.wp-block-coblocks-opentable .components-form-token-field__input' ).type( 'test' );

		cy.wait( 1000 );

		cy.get( '.components-form-token-field__suggestion' ).first().click();

		cy.get( 'button[type="submit"]' ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/opentable' );

		helpers.viewPage();

		helpers.editPage();

		helpers.selectBlock( 'opentable' );

		cy.get( 'button[id="id-aseal6-6"]' ).should( 'exist' ).click();
	} );

	/**
	 * Test that the No results found message is displayed when no restaurants are found.
	 */
	it( 'Test OpenTable block properly shows No results found on a superflouous query.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		cy.get( '.wp-block-coblocks-opentable .components-form-token-field__input' ).type( 'thereisnowaythiswouldeverreturnarealrestaurant' );

		cy.wait( 1000 );

		cy.get( '.components-notice__content' ).should( 'contain', 'No results found' );
	} );
} );

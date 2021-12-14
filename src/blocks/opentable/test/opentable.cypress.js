/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks OpenTable Block', function() {
	/**
	 * Test that we can add an OpenTable block to the content, not add anything and save the block
	 * without errors.
	 */
	it( 'Test OpenTable block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/opentable' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-opentable' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add an OpenTable block to the content, add a restaurant and then
	 * successfully save the block without errors.
	 */
	it( 'Test OpenTable block saves with single restaurant selection.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		cy.intercept( 'GET', 'index.php?rest_route=%2Fcoblocks%2Fopentable%2Fsearch*', { fixture: '../.dev/tests/cypress/fixtures/network/restaurants.json' } );

		cy.get( '.wp-block-coblocks-opentable .components-form-token-field__input' ).type( 'test' );

		cy.get( '.components-form-token-field__suggestion:nth-child(1)' ).click();

		cy.get( 'button[type="submit"]' ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/opentable' );

		helpers.viewPage();

		helpers.editPage();
	} );

	/**
	 * Test that we can add an OpenTable block to the content, add a restaurant and then
	 * change the block style to tall and have it display correctly.
	 */
	it( 'Test OpenTable changing to Tall style.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		cy.intercept( 'GET', 'index.php?rest_route=%2Fcoblocks%2Fopentable%2Fsearch*', { fixture: '../.dev/tests/cypress/fixtures/network/restaurants.json' } );

		cy.get( '.wp-block-coblocks-opentable .components-form-token-field__input' ).type( 'test' );

		cy.get( '.components-form-token-field__suggestion:nth-child(1)' ).click();

		cy.get( 'button[type="submit"]' ).click();

		helpers.selectBlock( 'opentable' );

		cy.get( 'button[aria-label="Edit Restaurant"]' ).should( 'exist' ).click();

		cy.get( '.block-editor-block-styles__item[aria-label="Tall"]' ).should( 'exist' ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/opentable' );

		helpers.viewPage();

		cy.get( 'div[class="wp-block-coblocks-opentable iframe__overflow-wrapper is-style-tall"]' ).should( 'exist' );

		helpers.editPage();
	} );
	/**
	 * Test that the No results found message is displayed when no restaurants are found.
	 */
	it( 'Test OpenTable block properly shows No results found on a superflouous query.', function() {
		helpers.addBlockToPost( 'coblocks/opentable', true );

		cy.intercept( 'GET', 'index.php?rest_route=%2Fcoblocks%2Fopentable%2Fsearch*', { fixture: '../.dev/tests/cypress/fixtures/network/none.json' } );

		cy.get( '.wp-block-coblocks-opentable .components-form-token-field__input' ).type( 'thereisnowaythiswouldeverreturnarealrestaurant' );

		cy.get( '.components-notice__content' ).should( 'contain', 'No results found' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/opentable' );

		helpers.viewPage();

		helpers.editPage();
	} );
	//}
} );

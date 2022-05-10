/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Extension: CoBlocks Labs', () => {
	beforeEach( () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );

		// The new page post_type admin page is already loaded before tests run.
		// cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
	} );

	it( 'renders modal with three items', () => {
		// Click "Test One" category.
		helpers.openCoBlocksLabsModal();

		// Ensure settings have loaded.
		cy.get( '.coblocks-labs-modal input[type="checkbox"]' ).should( 'have.length', 3 );
	} );
} );


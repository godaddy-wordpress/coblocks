/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';
import { LAYOUT_SELECTOR_FEATURE_ENABLED_KEY } from '../../layout-selector/constants';

describe( 'Extension: CoBlocks Labs', () => {
	beforeEach( () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );

		// Close layout selector to focus on the CoBlocks labs feature
		helpers.getWPDataObject().then( ( data ) => {
			data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
				[ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY ]: false,
			} );
		} );
	} );

	it( 'renders modal with three items', () => {
		// Click "Test One" category.
		helpers.openCoBlocksLabsModal();

		// Ensure settings have loaded.
		cy.get( '.coblocks-labs-modal input[type="checkbox"]' ).should( 'have.length', 3 );
	} );
} );


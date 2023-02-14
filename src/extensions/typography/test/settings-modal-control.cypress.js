import * as helpers from '../../../../.dev/tests/cypress/helpers';

import {
	TYPOGRAPHY_FEATURE_ENABLED_KEY,
} from '../constants';

before( () => {
	helpers.addBlockToPost( 'core/heading', true );
} );

describe( 'Settings Modal: Typography feature', () => {
	beforeEach( () => {
		// Reset settings.
		helpers.getWPDataObject().then( ( data ) => {
			data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
				[ TYPOGRAPHY_FEATURE_ENABLED_KEY ]: true,
			} );
		} );

		cy.get( '.edit-post-visual-editor .wp-block[data-type="core/heading"]' ).first().click();

		// Open settings modal.
		cy.get( '.interface-interface-skeleton__header .edit-post-more-menu .components-button' +
			', .interface-interface-skeleton__header .interface-more-menu-dropdown .components-button' ).click();
		cy.get( '.components-menu-item__button,.components-button' ).contains( 'Editor settings' ).click();
	} );

	afterEach( () => {
		cy.get( '.components-modal__header button[aria-label="Close dialog"]' ).click();
	} );

	it( 'can turn off all animation settings', () => {
		cy.get( '.components-coblocks-typography-dropdown' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Typography controls' ).click();

		cy.get( '.components-coblocks-typography-dropdown' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Typography controls' ).click();
	} );
} );

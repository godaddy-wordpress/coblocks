import * as helpers from '../../../../.dev/tests/cypress/helpers';

import {
	ANIMATION_FEATURE_ENABLED_KEY,
} from '../constants';

describe( 'Settings Modal: Animation feature', () => {
	beforeEach( () => {
		// Reset settings.
		helpers.getWPDataObject().then( ( data ) => {
			data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
				[ ANIMATION_FEATURE_ENABLED_KEY ]: true,
			} );
		} );
	} );

	it( 'can turn off all animation settings', () => {
		helpers.addBlockToPost( 'core/cover', true );

		cy.get( '.edit-post-visual-editor .wp-block[data-type="core/cover"]' ).first().click();

		// Open settings modal.
		cy.get( '.interface-interface-skeleton__header .edit-post-more-menu .components-button' +
			', .interface-interface-skeleton__header .interface-more-menu-dropdown .components-button' ).click();
		cy.get( '.components-menu-item__button,.components-button' ).contains( 'Editor settings' ).click();

		cy.get( '.components-coblocks-animation-toggle' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Animation controls' ).click();

		cy.get( '.components-coblocks-animation-toggle' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Animation controls' ).click();

		cy.get( '.components-modal__header button[aria-label*="Close"]' ).click();
	} );

	it( 'functions with only core blocks on page', () => {
		helpers.addBlockToPost( 'core/paragraph', true );

		helpers.selectBlock( 'core/paragraph' );

		cy.get( '.components-coblocks-animation-toggle' ).should( 'exist' );

		cy.get( 'p[data-type="core/paragraph"]' ).first().type( 'Test Animation' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'core/paragraph' );

		helpers.viewPage();

		// Ensure that on Front of the site, the animation script and styles are loaded.
		cy.get( 'script[id="coblocks-animation-js"]' );
		cy.get( 'link[id="coblocks-animation-css"]' );

		helpers.editPage();
	} );
} );

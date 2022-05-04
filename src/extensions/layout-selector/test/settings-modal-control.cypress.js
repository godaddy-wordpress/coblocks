import * as helpers from '../../../../.dev/tests/cypress/helpers';

import {
	LAYOUT_SELECTOR_FEATURE_ENABLED_KEY,
} from '../constants';

describe( 'Settings Modal: Layout Selector feature', () => {
	const createNewPage = () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();

		// Reset settings.
		helpers.getWindowObject().then( ( win ) => {
			win.wp.data.dispatch( 'coblocks/template-selector' ).updateCategories(
				[ { slug: 'test', title: 'Test' } ]
			);

			win.wp.data.dispatch( 'coblocks/template-selector' ).updateLayouts(
				[ {
					category: 'test',
					label: 'Test',
					blocks: [ [ 'core/paragraph', { content: 'Test paragraph.' }, [] ] ],
				} ]
			);
			// Reset settings.

			win.wp.data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
				[ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY ]: false, // Feature is disabled by default.
			} );
		} );
	};

	beforeEach( () => {
		createNewPage();
	} );

	it( 'can turn off layout selector setting', () => {
		cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );

		// Open settings modal.
		helpers.openEditorSettingsModal();
		const isDisabled = Cypress.$( ':contains(Layout selector)' ).last().parent().find( 'input' ).prop( 'disabled' );

		if ( isDisabled ) {
			return;
		}

		cy.get( '.coblocks-settings-modal' ).contains( 'Layout selector' ).parent().find( 'input' ).focus().click();

		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
		helpers.closeLayoutSelector();
		cy.get( '.components-modal__header button[aria-label="Close dialog"]' ).click();

		// Creating a new page should not load the layout selector.
		createNewPage();
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
	} );
} );

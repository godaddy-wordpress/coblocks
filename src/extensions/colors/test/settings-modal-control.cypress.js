import * as helpers from '../../../../.dev/tests/cypress/helpers';

import {
	COLORS_CUSTOM_FEATURE_ENABLED_KEY,
	COLORS_FEATURE_ENABLED_KEY,
	COLORS_GRADIENT_FEATURE_ENABLED_KEY,
} from '../constants';

before( () => {
	helpers.addBlockToPost( 'core/cover', true );
} );

describe( 'Settings Modal: Colors feature', () => {
	beforeEach( () => {
		// Reset settings.
		helpers.getWindowObject().then( ( win ) => {
			win.wp.data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
				[ COLORS_CUSTOM_FEATURE_ENABLED_KEY ]: true,
				[ COLORS_FEATURE_ENABLED_KEY ]: true,
				[ COLORS_GRADIENT_FEATURE_ENABLED_KEY ]: true,
			} );

			win.wp.data.dispatch( 'core/block-editor' ).updateSettings( {
				colors: [
					{
						color: 'rgb(255,255,255)',
						name: 'Primary',
						slug: 'primary',
					},
				],
				gradients: [
					{
						gradient: 'linear-gradient(135deg, rgb(0,0,0) 0%, rgb(255,255,255) 100%)',
						name: 'Primary to Secondary',
						slug: 'primary-to-secondary',
					},
				],
			} );
		} );

		// Open overlay settings on cover block where the color panel resides.
		cy.get( '.edit-post-visual-editor .wp-block[data-type="core/cover"]' ).first().click();
		helpers.openSettingsPanel( /Overlay/i );

		// Open settings modal.
		cy.get( '.interface-interface-skeleton__header .edit-post-more-menu .components-button' ).click();
		cy.get( '.components-menu-item__button,.components-button' ).contains( 'Editor settings' ).click();
	} );

	afterEach( () => {
		cy.get( '.components-modal__header button[aria-label="Close dialog"]' ).click();
	} );

	it( 'can turn off all color settings', () => {
		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'exist' );
		cy.get( '.components-circular-option-picker__dropdown-link-action, .components-color-palette__custom-color' ).should( 'exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button, .components-toggle-group-control' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Color settings' ).click();

		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'not.exist' );
		cy.get( '.components-circular-option-picker__dropdown-link-action, .components-color-palette__custom-color' ).should( 'not.exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button, .components-toggle-group-control' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Color settings' ).click();
	} );

	it( 'can turn off custom color settings', () => {
		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'exist' );
		cy.get( '.components-circular-option-picker__dropdown-link-action, .components-color-palette__custom-color' ).should( 'exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button, .components-toggle-group-control' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Custom color pickers' ).click();

		cy.get( '.components-circular-option-picker__dropdown-link-action, .components-color-palette__custom-color' ).should( 'not.exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button, .components-toggle-group-control' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Custom color pickers' ).click();
	} );

	it( 'can turn off gradient settings', () => {
		cy.get( '.components-panel__body-title' ).contains( /Overlay/i ).should( 'exist' );
		cy.get( '.block-editor-color-gradient-control__button-tabs button, .components-toggle-group-control' ).should( 'exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Gradient styles' ).click();

		cy.get( '.block-editor-color-gradient-control__button-tabs button, .components-toggle-group-control' ).should( 'not.exist' );

		cy.get( '.coblocks-settings-modal' ).contains( 'Gradient styles' ).click();
	} );
} );

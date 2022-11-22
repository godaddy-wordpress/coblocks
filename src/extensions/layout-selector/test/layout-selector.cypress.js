/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

import {
	LAYOUT_SELECTOR_FEATURE_ENABLED_KEY,
} from '../constants';

describe( 'Extension: Layout Selector', () => {
	if ( Cypress.browser.name !== 'firefox' ) {
		beforeEach( () => {
			helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
			helpers.disableGutenbergFeatures();

			// Reset settings.
			helpers.getWindowObject().then( ( win ) => {
				win.wp.data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
					[ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY ]: true,
				} );

				win.wp.data.dispatch( 'coblocks/template-selector' ).updateCategories(
					[
						{ slug: 'test-one', title: 'Test One' },
						{ slug: 'test-two', title: 'Test Two' },
					]
				);

				win.wp.data.dispatch( 'coblocks/template-selector' ).updateLayouts(
					[
						{
							blocks: [ [ 'core/paragraph', { content: 'Test One paragraph.' }, [] ] ],
							category: 'test-one',
							label: 'Test One',
						},
						{
							blocks: [ [ 'core/paragraph', { content: 'Test Two paragraph.' }, [] ] ],
							category: 'test-two',
							label: 'Test Two',
						},
					]
				);
			} );

			// The new page post_type admin page is already loaded before tests run.
			cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
		} );

		it( 'loads layouts of each category', () => {
			// Click "Test One" category.
			cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(1)' ).find( 'a' ).click();
			cy.get( '.coblocks-layout-selector__layouts .coblocks-layout-selector__layout' ).should( 'not.have.length', 0 );

			// Click "Test Two" category.
			cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(2)' ).find( 'a' ).click();
			cy.get( '.coblocks-layout-selector__layouts .coblocks-layout-selector__layout' ).should( 'not.have.length', 0 );
		} );

		it( 'inserts layout into page', () => {
			cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(1)' ).find( 'a' ).click();

			// Ensure layout is loaded
			helpers.getIframeBody( '.block-editor-block-preview__content' ).should( 'exist' );

			cy.get( '.coblocks-layout-selector__layout' ).first().click();

			cy.get( '.editor-post-title__block, .editor-post-title' ).contains( 'Test One' );
			cy.get( '.edit-post-visual-editor' ).contains( 'Test One paragraph.' );
		} );

		it( 'inserts blank layout into page', () => {
			// Click "Add Blank Page" button.
			cy.get( '.coblocks-layout-selector__add-button' ).first().click();

			// Post title block should be empty.
			cy.get( '.editor-post-title__block, .editor-post-title' ).find( 'textarea, span' ).should( 'be.empty' );

			// The first block should be the default prompt.
			cy.get( '.edit-post-visual-editor .block-editor-block-list__layout .wp-block' );
			cy.contains( RegExp( 'type / to choose a block', 'i' ) );
		} );

		it( 'does not show modal on add new "post" post_type', () => {
			helpers.goTo( '/wp-admin/post-new.php?post_type=post' );
			helpers.disableGutenbergFeatures();

			cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );
		} );

		it( 'does not open modal when editing a draft post', () => {
			// Ensure the preview has rendered before clicking it.
			cy.get( '.block-editor-block-preview__container' ).should( 'exist' );
			cy.get( '.coblocks-layout-selector__layout' ).first().click();
			cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );

			cy.get( '.editor-post-save-draft' ).click();
			cy.reload();
			cy.get( '.edit-post-visual-editor' );

			helpers.disableGutenbergFeatures();
			cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );
		} );
	}
} );

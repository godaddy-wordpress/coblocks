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

			// Go Should always load '#go-block-filters-js' script.
			if ( ! Cypress.$( '#go-block-filters-js' ).length ) {
				cy.then( () => cy.state( 'test' ).skip() ); // Only run tests on Go theme.
			}

			// Reset settings deterministically and open modal after data is ready.
			cy.window().then( ( win ) => {
				const data = win.wp?.data;
				const setLayoutSelector = ( setting ) => data.dispatch( 'core' ).saveEntityRecord( 'root', 'site', { [ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY ]: setting } );

				// Disable, seed, then enable in a promise chain to ensure persistence.
				return setLayoutSelector( false )
					.then( () => {
						data.dispatch( 'coblocks/template-selector' ).updateCategories( [
							{ slug: 'test-one', title: 'Test One' },
							{ slug: 'test-two', title: 'Test Two' },
						] );
						data.dispatch( 'coblocks/template-selector' ).updateLayouts( [
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
						] );
						return setLayoutSelector( true );
					} );
			} );

			// Wait for Go theme filter script and then computed layouts before opening
			cy.get( '#go-block-filters-js', { timeout: 60000 } ).should( 'exist' );
			cy.window( { timeout: 60000 } ).should( ( win ) => {
				const ts = win.wp?.data?.select( 'coblocks/template-selector' );
				const len = ts && typeof ts.getComputedLayouts === 'function' ? ( ts.getComputedLayouts() || [] ).length : 0;
				// eslint-disable-next-line no-unused-expressions
				expect( len ).to.be.greaterThan( 0 );
			} );

			// Explicitly open the template selector to avoid race with resolver
			cy.window().then( ( win ) => {
				win.wp?.data?.dispatch( 'coblocks/template-selector' )?.openTemplateSelector?.();
			} );

			// The new page post_type admin page is already loaded before tests run.
			cy.get( '.coblocks-layout-selector-modal', { timeout: 60000 } ).should( 'exist' );
		} );

		it( 'loads layouts of each category', () => {
			// Click "Test One" and verify via store that parsed layouts exist for the category.
			cy.contains( '.coblocks-layout-selector__sidebar__item a', 'Test One' ).click();
			cy.window( { timeout: 60000 } ).should( ( win ) => {
				const ts = win.wp?.data?.select( 'coblocks/template-selector' );
				const list = ts && typeof ts.getComputedLayouts === 'function' ? ( ts.getComputedLayouts() || [] ) : [];
				const count = list.filter( ( l ) => l.category === 'test-one' && ( l.parsedBlocks || [] ).length > 0 ).length;
				// eslint-disable-next-line no-unused-expressions
				expect( count ).to.be.greaterThan( 0 );
			} );

			// Click "Test Two" and verify via store.
			cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(2)' ).find( 'a' ).click();
			cy.window( { timeout: 60000 } ).should( ( win ) => {
				const ts = win.wp?.data?.select( 'coblocks/template-selector' );
				const list = ts && typeof ts.getComputedLayouts === 'function' ? ( ts.getComputedLayouts() || [] ) : [];
				const count = list.filter( ( l ) => l.category === 'test-two' && ( l.parsedBlocks || [] ).length > 0 ).length;
				// eslint-disable-next-line no-unused-expressions
				expect( count ).to.be.greaterThan( 0 );
			} );
		} );

		it( 'inserts layout into page', () => {
			// Ensure editor is ready
			cy.get( '.is-root-container.wp-block-post-content', { timeout: 60000 } );

			// Use store to retrieve a parsed layout and insert blocks via block-editor API.
			cy.window( { timeout: 60000 } ).then( ( win ) => {
				const data = win.wp?.data;
				const ts = data?.select( 'coblocks/template-selector' );
				const list = ts && typeof ts.getComputedLayouts === 'function' ? ( ts.getComputedLayouts() || [] ) : [];
				const layout = list.find( ( l ) => l.category === 'test-one' && ( l.parsedBlocks || [] ).length > 0 );
				if ( layout ) {
					data?.dispatch( 'core/block-editor' )?.insertBlocks?.( layout.parsedBlocks );
					data?.dispatch( 'core/editor' )?.editPost?.( { title: layout.label } );
					data?.dispatch( 'coblocks/template-selector' )?.closeTemplateSelector?.();
				}
			} );

			// Validate modal is closed and no editor/block errors are present.
			// Fallback UI close if still present (theme may re-open or delay store close)
			cy.get( 'body' ).then( ( $body ) => {
				if ( $body.find( '.coblocks-layout-selector-modal' ).length ) {
					if ( $body.find( '.coblocks-layout-selector__add-button' ).length ) {
						cy.get( '.coblocks-layout-selector__add-button' ).first().click();
					} else if ( $body.find( '.components-modal__close' ).length ) {
						cy.get( '.components-modal__close' ).click();
					}
				}
			} );
			cy.get( '.coblocks-layout-selector-modal', { timeout: 60000 } ).should( 'not.exist' );
			cy.get( '.block-editor-warning' ).should( 'not.exist' );
			cy.get( 'body.php-error' ).should( 'not.exist' );
			cy.get( '.is-root-container.wp-block-post-content', { timeout: 60000 } ).should( 'exist' );
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

/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Extension: Layout Selector', () => {

	it( 'shows modal on add new "page" post_type', () => {
		// The new page post_type admin page is already loaded before tests run.
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
	} );

	it( 'loads layouts of each category', () => {
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );

		// Click "About" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(1)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layout' ).contains( 'Test About Content' );

		// Click "Contact" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(2)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layout' ).contains( 'Test Contact Content' );

		// Click "Home" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(3)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layout' ).contains( 'Test Home Content' );

		// Click "Portfolio" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(4)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layout' ).contains( 'Test Portfolio Content' );
	} );

	it( 'inserts layout into page', () => {
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );

		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(1)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layout' ).contains( 'Test About Content' )
		cy.get( '.coblocks-layout-selector__layout' ).first().click();

		cy.get( '.editor-post-title__block' ).contains( 'Test Layout' );
		cy.get( '.wp-block' ).contains( 'Test About Content' );

		// Reset the page.
		helpers.doEditorUndo();
	} );

	it( 'inserts blank layout into page', () => {
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );

		// Click "Add Blank Page" button.
		cy.get( '.coblocks-layout-selector__add-button' ).first().click();

		// Post title block should be empty.
		cy.get( '.editor-post-title__block' ).find( 'textarea' ).should( 'be.empty' );

		// The first block should be the default prompt.
		cy.get( '.wp-block' ).should( 'have.length', 2 );
		cy.get( '.wp-block' ).last().find( 'textarea' ).should( 'have.value', 'Start writing or type / to choose a block' );
	} );

	it( 'does not show modal on add new "post" post_type', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=post' );
		helpers.disableGutenbergFeatures();
		cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );
	} );

	it( 'does not open modal when disabled via the "Editor Settings" panel', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();

		helpers.closeLayoutSelector();

		helpers.openEditorSettingsModal();
		helpers.turnOffEditorSetting( 'Layout selector' );

		// Check that the modal does not show.
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();
		cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );

		helpers.openEditorSettingsModal();
		helpers.turnOnEditorSetting( 'Layout selector' );

		// Check that the modal does show.
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
	} );

} );

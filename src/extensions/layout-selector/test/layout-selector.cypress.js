/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Extension: Layout Selector', () => {
	it( 'shows modal on add new "page" post_type', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();

		// The new page post_type admin page is already loaded before tests run.
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
	} );

	it( 'loads layouts of each category', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();

		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );

		// Click "About" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(1)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layouts .coblocks-layout-selector__layout' ).should( 'not.have.length', 0 );

		// Click "Contact" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(2)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layouts .coblocks-layout-selector__layout' ).should( 'not.have.length', 0 );

		// Click "Home" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(3)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layouts .coblocks-layout-selector__layout' ).should( 'not.have.length', 0 );

		// Click "Portfolio" category.
		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(4)' ).find( 'a' ).click();
		cy.get( '.coblocks-layout-selector__layouts .coblocks-layout-selector__layout' ).should( 'not.have.length', 0 );
	} );

	it( 'inserts layout into page', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();

		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );

		cy.get( '.coblocks-layout-selector__sidebar__item:nth-child(1)' ).find( 'a' ).click();

		cy.get( '[data-type="core/image"] img[src*="http"]' ); // Ensure layout is loaded

		cy.get( '.coblocks-layout-selector__layout' ).first().click();

		cy.get( '.editor-post-title__block' ).contains( 'About' );
		cy.get( '.wp-block' ).contains( 'Test About Layout' );

		cy.get( `[data-type="core/image"] img[src*="http"]` ).should( 'exist' );
	} );

	it( 'inserts blank layout into page', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();

		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );

		// Click "Add Blank Page" button.
		cy.get( '.coblocks-layout-selector__add-button' ).first().click();

		// Post title block should be empty.
		cy.get( '.editor-post-title__block' ).find( 'textarea' ).should( 'be.empty' );

		// The first block should be the default prompt.
		cy.get( '.edit-post-visual-editor .block-editor-block-list__layout' ).find( '> .wp-block' ).should( 'have.length', 1 );
		cy.get( '.block-editor-default-block-appender' ).find( 'textarea' ).should( 'have.value', 'Start writing or type / to choose a block' );
	} );

	it( 'does not show modal on add new "post" post_type', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=post' );
		helpers.disableGutenbergFeatures();

		cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );
	} );

	it( 'does not open modal when disabled via the "Editor Settings" panel', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();
		cy.get( '.coblocks-layout-selector-modal' )
			.find( '.components-button[aria-label="Close dialog"]' ).first()
			.click();

		helpers.openEditorSettingsModal();
		helpers.turnOffEditorSetting( 'Layout selector' );

		// Check that the modal does not show.
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();
		cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );

		helpers.openEditorSettingsModal();
		helpers.turnOnEditorSetting( 'Layout selector' );

		// Check that the modal does show.
		// helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();
		cy.get( '.coblocks-layout-selector-modal' ).should( 'exist' );
	} );

	it( 'does not open modal when editing a draft post', () => {
		helpers.goTo( '/wp-admin/post-new.php?post_type=page' );
		helpers.disableGutenbergFeatures();

		cy.get( '[data-type="core/image"] img[src*="http"]' ); // Ensure layout is loaded
		cy.get( '.coblocks-layout-selector__layout' ).first().click();
		cy.get( '[data-type="core/image"] img[src*="http"]' ).should( 'exist' );
		cy.get( '.editor-post-save-draft' ).click();

		// Reload the post.
		let postID;
		// eslint-disable-next-line jest/valid-expect-in-promise
		cy.window()
			.then( ( win ) => {
				postID = win.wp.data.select( 'core/editor' ).getCurrentPostId();
			} )
			.then( () => {
				helpers.goTo( `/wp-admin/post.php?post=${ postID }&action=edit` );

				helpers.disableGutenbergFeatures();
				cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );
			} );
	} );
} );

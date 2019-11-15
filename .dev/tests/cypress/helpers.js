/*
 * Include our constants
 */
import { wpUsername, wpPassword, testURL } from './constants';

/**
 * Login to our test WordPress site
 */
export function loginToSite() {

  cy.get( 'html' ).wait( 3000 ).then( ( $html ) => {
    // Editor page, do nothing.
    if ( $html.find( '.block-editor-page' ).length ) {
      return;
    } else {
      cy.visit( testURL + '/wp-admin' )
        .wait( 3000 );

      cy.url().then( ( $url ) => {
        if ( $url.includes( '/wp-login.php' ) ) {
          cy.get( '#user_login' )
            .wait( 1000 )
            .type( wpUsername );

          cy.get( '#user_pass' )
            .wait( 1000 )
            .type( wpPassword );

          cy.get( '#wp-submit' )
            .click();

          cy.get( '.wrap h1' )
            .should( 'contain', 'Dashboard' );
        }
      } );
    }
  } );

}

/**
 * Create a new post to add blocks to
 */
export function createNewPost( blockName ) {

  cy.visit( testURL + '/wp-admin/post-new.php?post_type=page' );
  disableGutenbergTips();
  cy.get( 'textarea.editor-post-title__input' )
    .type( 'CoBlocks ' + blockName + ' Tests' );

}

/**
 * Disable Gutenberg Tips
 */
export function disableGutenbergTips() {
  cy.window().then( ( win ) => {
    if ( ! win.wp.data.select('core/nux').areTipsEnabled() ) {
      return;
    }
    win.wp.data.dispatch( 'core/nux' ).disableTips();
  } );
}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 */
export function addCoBlocksBlockToPage( blockID ) {

  cy.get( '.edit-post-visual-editor .block-editor-inserter__toggle' )
    .click();

  cy.contains( 'Most Used' )
    .click();

  cy.get( '.components-panel__body-title' )
    .contains( 'CoBlocks' )
    .click();

  cy.get( '.editor-block-list-item-coblocks-' + blockID )
    .click();

  // Make sure the block was added to our page
  cy.get( '.wp-block-coblocks-' + blockID ).should( 'exist' );

}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 */
export function savePage() {

  cy.get( '.edit-post-header__settings' ).then( ( $headerSettingsBar ) => {
    if ( $headerSettingsBar.find( 'button.is-primary' ).length ) {
      cy.get( '.edit-post-header__settings button.is-primary' ).then( ( $publishBtn ) => {
        $publishBtn.click();
        if ( $publishBtn.text( 'Publish' ) ) {
          cy.get( '.editor-post-publish-panel button.is-primary' )
            .click();
          cy.get( '.components-snackbar__content' ).contains( 'Page published' );
        } else { // Update
          cy.get( '.components-snackbar__content' ).contains( 'Page updated' );
        }
      } );
    }
  } );
}

/**
 * Check the page for block errors
 */
export function checkForBlockErrors( blockID = '' ) {
  cy.get( '#editor' ).then( ( $editor ) => {
    disableGutenbergTips();
    cy.get( '.block-editor-warning' ).should( 'not.exist' );
    if ( ! blockID.length ) {
      return;
    }
    cy.get( 'div[data-type="coblocks/' + blockID + '"]' ).should( 'exist' );
  } );
}

/**
 * View the currently edited page on the front of site
 */
export function viewPage() {
  cy.get( '#wp-admin-bar-view' )
    .click();
}

/**
 * Edit the currently viewed page
 */
export function editPage() {
  cy.get( '#wp-admin-bar-edit' )
    .click();
}

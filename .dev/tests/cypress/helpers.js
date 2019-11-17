/*
 * Include our constants
 */
import { wpUsername, wpPassword, testURL } from './constants';

/**
 * Login to our test WordPress site
 */
export function loginToSite() {

  cy.get( 'html' ).then( ( $html ) => {

    // Editor page, do nothing.
    if ( $html.find( '.block-editor-page' ).length ) {

      return;

    } else {

      cy.visit( testURL + '/wp-admin' );

      cy.url().then( ( $url ) => {

        if ( $url.includes( '/wp-login.php' ) ) {

          cy.wait( 2000 );

          cy.get( '#user_login' )
            .type( wpUsername );

          cy.get( '#user_pass' )
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
export function createNewPost() {

  cy.visit( testURL + '/wp-admin/post-new.php?post_type=page' );

  disableGutenbergFeatures();

  cy.get( 'textarea.editor-post-title__input' )
    .type( 'CoBlocks ' + getBlockName() + ' Tests' );

}

/**
 * Disable Gutenberg Tips
 */
export function disableGutenbergFeatures() {

  cy.window().then( ( win ) => {

    if ( ! win.wp.data.select('core/nux').areTipsEnabled() ) {

      return;

    }

    win.wp.data.dispatch( 'core/nux' ).disableTips();
    win.wp.data.dispatch( 'core/editor' ).disablePublishSidebar();

  } );

}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 *
 * @param string blockID Optional ID to check for in the DOM.
 *               Note: If no blockID is specified, getBlockSlug() attempts to
 *               retreive the block from the spec file.
 */
export function addCoBlocksBlockToPage( blockID = '' ) {

  if ( ! blockID.length ) {

    blockID = getBlockSlug();

  }

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

  cy.get( '.edit-post-header__settings button.is-primary' ).click();

  cy.get( '.components-snackbar-list__notice-container' ).should( 'be.visible' );

  // Reload the page to ensure that we're not hitting any block errors
  cy.reload();

}

/**
 * Check the page for block errors
 *
 * @param string blockID Optional ID to check for in the DOM.
 *               Note: If no blockID is specified, getBlockSlug() attempts to
 *               retreive the block from the spec file.
 *               eg: accordion => div[data-type="coblocks/accordion"]
 */
export function checkForBlockErrors( blockID = '' ) {

  if ( ! blockID.length ) {

    blockID = getBlockSlug();

  }

  cy.get( '#editor' ).then( ( $editor ) => {

    disableGutenbergFeatures();

    cy.get( '.block-editor-warning' ).should( 'not.exist' );

    cy.get( 'div[data-type="coblocks/' + blockID + '"]' ).should( 'exist' );

  } );

}

/**
 * View the currently edited page on the front of site
 */
export function viewPage() {

  cy.get( '#wpadminbar' ).then( ( $adminBar ) => {

    if ( Cypress.$( '#wp-admin-bar-view' ).length ) {

      cy.get( '#wp-admin-bar-view' )
        .click();

    }

  } );

}

/**
 * Edit the currently viewed page
 */
export function editPage() {

  cy.get( '#wp-admin-bar-edit' )
    .click();

}

/**
 * Clear all blocks from the editor
 */
export function clearBlocks() {

  cy.window().then( ( win ) => {

    win.wp.data.dispatch( 'core/editor' ).resetBlocks( [] );

  } );

}

/**
 * Attempts to retrieve the block name from the current spec file being run
 * eg: accordion.js => Accordion
 */
export function getBlockName() {

  var specFile  = Cypress.spec['name'],
      fileBase  = ( specFile.split( '/' ).pop().replace( '.js', '' ) ),
      blockName = fileBase.charAt( 0 ).toUpperCase() + fileBase.slice( 1 );

  return blockName;

}

/**
 * Attempts to retrieve the block slug from the current spec file being run
 * eg: accordion.js => accordion
 */
export function getBlockSlug() {

  var specFile  = Cypress.spec['name'],
      fileBase  = ( specFile.split( '/' ).pop().replace( '.js', '' ) );

  return fileBase;

}

/**
 * Set a Color Setting value to a custom hex color
 *
 * @param string settingName The setting to update. background|text
 * @param string hexColor    The custom hex color to set. eg: #55e7ff
 */
export function setColorSetting( settingName, hexColor ) {

  cy.get( '.editor-panel-color-settings' ).then( ( $panelTop ) => {
    if ( ! $panelTop.hasClass( 'is-opened' ) ) {
      cy.get( '.editor-panel-color-settings' )
        .click();

      cy.get( '.editor-panel-color-settings .block-editor-color-palette-control' )
        .should( 'be.visible' );
    }
  } );

  var elementSelector;

  switch ( settingName ) {
    case 'background':
      elementSelector = '.editor-panel-color-settings .block-editor-color-palette-control:nth-child(2) .components-color-palette__custom-color';
      break;

    case 'text':
      elementSelector = '.editor-panel-color-settings .block-editor-color-palette-control:nth-child(3) .components-color-palette__custom-color';
      break;
  }

  cy.get( elementSelector )
    .click();

  cy.get( '.components-color-picker__inputs-field input[type="text"]' )
    .clear()
    .type( hexColor );

}

/**
 * Toggle an checkbox in the settings panel of the block editor
 *
 * @param  string checkboxLabelText The checkbox label text. eg:
 * @return {[type]}                   [description]
 */
export function toggleCheckbox( checkboxLabelText ) {

  cy.get( '.components-toggle-control__label' )
    .contains( checkboxLabelText )
    .parent( '.components-base-control__field' )
    .find( '.components-form-toggle__input' )
    .click();

}

/**
 * Add custom classes to a block
 *
 * @param string classes Custom classe(s) to add to the block
 */
export function addCustomBlockClass( classes ) {

  var blockSlug = getBlockSlug();

  cy.get( '.wp-block[data-type="coblocks/' + blockSlug + '"]' )
    .dblclick( 'right' );

  cy.get( '.components-panel__body-toggle' )
    .contains( 'Advanced' )
    .click();

  cy.get( '.editor-block-inspector__advanced .components-base-control__label' )
    .contains( 'Additional CSS Class(es)' )
    .should( 'be.visible' );

  cy.get( '.editor-block-inspector__advanced .components-base-control__label' )
    .parent( '.components-base-control__field' )
    .find( '.components-text-control__input' )
    .type( classes );

  cy.get( '.wp-block.is-selected[data-type="coblocks/' + blockSlug + '"] .wp-block-coblocks-' + blockSlug )
    .should( 'have.class', classes );

}

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
		if ( !! win.wp.data.select( 'core/nux' ) ) { // < GB 7.2 || < WP 5.4
			if ( ! win.wp.data.select( 'core/nux' ).areTipsEnabled() ) {
				return;
			}

			win.wp.data.dispatch( 'core/nux' ).disableTips();
			win.wp.data.dispatch( 'core/editor' ).disablePublishSidebar();
		} else { // GB 7.2 || WP 5.4
			if ( ! win.wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' ) ) {
				return;
			}

			win.wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );
			win.wp.data.dispatch( 'core/editor' ).disablePublishSidebar();
		}
	} );
}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 *
 * @param bool   clearEditor Whether or not to clear all blocks on the page before
 *                           adding a new block to the page.
 * @param string blockID     Optional ID to check for in the DOM.
 *                           Note: If no blockID is specified, getBlockSlug()
 *                           attempts to retreive the block from the spec file.
 */
export function addCoBlocksBlockToPage( clearEditor = true, blockID = '' ) {
	if ( clearEditor ) {
		clearBlocks();
	}

	if ( ! blockID.length ) {
		blockID = getBlockSlug();
	}

	const isGalleryBlock = RegExp( 'gallery-' ).test( blockID );

	cy.get( '.block-list-appender .wp-block .block-editor-inserter__toggle' )
		.click();

	// Close 'Most Used' panel
	cy.get( '.components-panel__body-title' )
		.contains( /most used/i ) // Regex to handle case difference WP 5.4
		.then( ( $mostUsedPanel ) => {
			const $parentPanel = Cypress.$( $mostUsedPanel ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$mostUsedPanel.click();
			}
		} );

	// Show Block panel
	cy.get( '.components-panel__body-title' )
		.contains( isGalleryBlock ? 'CoBlocks Galleries' : 'CoBlocks' )
		.then( ( $coblocksPanel ) => {
			const $parentPanel = Cypress.$( $coblocksPanel ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$coblocksPanel.click();
			}
		} );

	cy.get( '.components-panel__body.is-opened .editor-block-list-item-coblocks-' + blockID )
		.click();

	// Make sure the block was added to our page
	cy.get( `div[data-type="coblocks/${ blockID }"]` ).should( 'exist' );
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
	let specFile = Cypress.spec.name,
		fileBase = ( specFile.split( '/' ).pop().replace( '.cypress.js', '' ) ),
		blockName = fileBase.charAt( 0 ).toUpperCase() + fileBase.slice( 1 );

	return blockName;
}

/**
 * Attempts to retrieve the block slug from the current spec file being run
 * eg: accordion.js => accordion
 */
export function getBlockSlug() {
	let specFile = Cypress.spec.name,
		fileBase = ( specFile.split( '/' ).pop().replace( '.cypress.js', '' ) );

	return fileBase;
}

/**
 * Click on a style button within the style panel
 *
 * @param string style   Name of the style to apply
 */
export function setBlockStyle( style ) {
	openSettingsPanel( RegExp( 'styles', 'i' ) );
  
	cy.get( '.edit-post-sidebar' ).find( '.editor-block-styles' )
		.contains( RegExp( style, 'i' ) )
		.click( { force: true } );
}

/**
 * Set a value within the input box
 *
 * @param string panelName   Name of the panel to open
 * @param string settingName The setting to update. shape height|background height
 * @param string value    	 The value to set in the input
 * @param bool 	 ignoreCase  Optional case sensitivity. Default will ignore case.
 */
export function setInputValue( panelName, settingName, value, ignoreCase = true ) {
	openSettingsPanel( ignoreCase ? RegExp( panelName, 'i' ) : panelName );

	cy.get( '.edit-post-sidebar' )
		.contains( ignoreCase ? RegExp( settingName, 'i' ) : settingName ).not( '.block-editor-block-card__description' )
		.then( $settingSection => {
			cy.get( Cypress.$( $settingSection ).parent() )
				.find( 'input[type="number"]' )
				.clear()
				.click()
				.type( value );
		} );
}

/**
 * Set a Color Setting value to a custom hex color
 *
 * @param string settingName The setting to update. background|text
 * @param string hexColor    The custom hex color to set. eg: #55e7ff
 */
export function setColorSetting( settingName, hexColor ) {
	openSettingsPanel( /color settings/i );
	cy.get( '.components-base-control__field' )
		.contains( RegExp( settingName, 'i' ) )
		.then( $subColorPanel => {
			cy.get( Cypress.$( $subColorPanel ).parent() )
				.contains( /custom color/i )
				.click();
			cy.get( '.components-color-picker__inputs-field input[type="text"]' )
				.clear()
				.type( hexColor );
			cy.get( Cypress.$( $subColorPanel ).parent() )
				.contains( /custom color/i )
				.click();
		} );
}

/**
 * Open a certain settings panel in the right hand sidebar of the editor
 *
 * @param string panelText The panel label text to open. eg: Color Settings
 */
export function openSettingsPanel( panelText ) {
	cy.get( '.components-panel__body-title' ).contains( panelText ).then( ( $panelTop ) => {
		const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
		if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
			$panelTop.click();
		}
	} );
}

/**
 * Toggle an checkbox in the settings panel of the block editor
 *
 * @param  string checkboxLabelText The checkbox label text. eg: Drop Cap
 */
export function toggleSettingCheckbox( checkboxLabelText ) {
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
 * @param string blockID Optional ID to check for in the DOM.
 *               Note: If no blockID is specified, getBlockSlug() attempts to
 *               retrieve the block from the spec file.
 *               eg: accordion => div[data-type="coblocks/accordion"]
 */
export function addCustomBlockClass( classes, blockID = '' ) {
	if ( ! blockID.length ) {
		blockID = getBlockSlug();
	}

	cy.get( '.wp-block[data-type="coblocks/' + blockID + '"]' )
		.dblclick( 'right', { force: true } );

	cy.get( '.components-panel__body' )
		.contains( 'Advanced' )
		.click();

	cy.get( 'div.edit-post-sidebar' )
		.contains( /Additional CSS/i )
		.scrollIntoView()
		.should( 'be.visible' )
		.parent( '.components-base-control__field' )
		.find( '.components-text-control__input' )
		.then( $inputElem => {
			cy.get( $inputElem ).invoke( 'val' ).then( ( val ) => {
				if ( val.length > 0 ) {
					cy.get( $inputElem ).type( [ val, classes ].join( ' ' ) );
				} else {
					cy.get( $inputElem ).type( classes );
				}
			} );
		} );

	cy.get( '.wp-block-coblocks-' + blockID )
		.should( 'have.class', classes );
}
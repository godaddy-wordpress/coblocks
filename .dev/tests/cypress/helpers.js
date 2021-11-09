/**
 * Internal dependencies.
 */
import coblocksLayoutSelector from '../../../src/extensions/layout-selector/test/cypress-layouts';

/**
 * Close layout selector.
 */
export function closeLayoutSelector() {
	cy.get( '.coblocks-layout-selector-modal' ).its( 'length' ).then( ( layoutSelectorModal ) => {
		if ( layoutSelectorModal > 0 ) {
			cy.get( '.coblocks-layout-selector-modal' )
				.find( '.components-button[aria-label="Close dialog"]' ).first()
				.click();
		}
	} );

	cy.get( '.coblocks-layout-selector-modal' ).should( 'not.exist' );
}

/**
 * Add Form block child element by name.
 *
 * @param {string} name the name of the child block to add.
 */
export function addFormChild( name ) {
	cy.get( '[data-type="coblocks/form"] [data-type^="coblocks/field"]' ).first().click( { force: true } );
	cy.get( '.block-editor-block-settings-menu' ).click();
	cy.get( '.components-popover__content button' ).contains( /insert after/i ).click( { force: true } );
	cy.get( '[data-type="coblocks/form"] [data-type="core/paragraph"]' ).click( { force: true } );

	cy.get( '.edit-post-header-toolbar' ).find( '.edit-post-header-toolbar__inserter-toggle' ).click( { force: true } );
	cy.get( '.block-editor-inserter__search' ).click().type( name );

	cy.get( '.block-editor-inserter__content .editor-block-list-item-coblocks-field-' + name ).first().click( { force: true } );
	cy.get( `[data-type="coblocks/field-${ name }"]` ).should( 'exist' ).click( { force: true } );
}

/**
 * Login to our test WordPress site
 */
export function loginToSite() {
	goTo( '/wp-admin/post-new.php?post_type=post' )
		.then( ( window ) => {
			if ( window.location.pathname === '/wp-login.php' ) {
			// WordPress has a wp_attempt_focus() function that fires 200ms after the wp-login.php page loads.
			// We need to wait a short time before trying to login.
				cy.wait( 250 );

				cy.get( '#user_login' ).type( Cypress.env( 'wpUsername' ) );
				cy.get( '#user_pass' ).type( Cypress.env( 'wpPassword' ) );
				cy.get( '#wp-submit' ).click();
			}
		} );

	cy.get( '.block-editor-page' ).should( 'exist' );
}

/**
 * Go to a specific URI.
 *
 * @param {string} path The URI path to go to.
 */
export function goTo( path = '/wp-admin' ) {
	cy.visit( Cypress.env( 'testURL' ) + path );

	return getWindowObject().then( ( safeWin ) => {
		// Only set global `safeWin.coblocksLayoutSelector` on new pages.
		if ( safeWin.location.href.includes( 'post-new.php?post_type=page' ) ) {
			safeWin.coblocksLayoutSelector = coblocksLayoutSelector;

			safeWin.wp.data.dispatch( 'coblocks/template-selector' ).updateLayouts( coblocksLayoutSelector.layouts );
			safeWin.wp.data.dispatch( 'coblocks/template-selector' ).updateCategories( coblocksLayoutSelector.categories );
		}
	} );
}

/**
 * Safely obtain the window object or error
 * when the window object is not available.
 */
export function getWindowObject() {
	const editorUrlStrings = [ 'post-new.php', 'action=edit' ];
	return cy.window().then( ( win ) => {
		const isEditorPage = editorUrlStrings.filter( ( str ) => win.location.href.includes( str ) );

		if ( isEditorPage.length === 0 ) {
			throw new Error( 'Check the previous test, window property was invoked outside of Editor.' );
		}

		if ( ! win?.wp ) {
			throw new Error( 'Window property was invoked within Editor but `win.wp` is not defined.' );
		}

		return win;
	} );
}

/**
 * Disable Gutenberg Tips
 */
export function disableGutenbergFeatures() {
	getWindowObject().then( ( safeWin ) => {
		// Enable "Top Toolbar"
		if ( ! safeWin.wp.data.select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ) ) {
			safeWin.wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fixedToolbar' );
		}

		if ( !! safeWin.wp.data.select( 'core/nux' ) ) { // < GB 7.2 || < WP 5.4
			if ( ! safeWin.wp.data.select( 'core/nux' ).areTipsEnabled() ) {
				return;
			}

			safeWin.wp.data.dispatch( 'core/nux' ).disableTips();
			safeWin.wp.data.dispatch( 'core/editor' ).disablePublishSidebar();
		} else { // GB 7.2 || WP 5.4
			if ( ! safeWin.wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' ) ) {
				return;
			}

			safeWin.wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );
			safeWin.wp.data.dispatch( 'core/editor' ).disablePublishSidebar();
		}
	} );
}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 *
 * @param {string}  blockName   The name to find in the block inserter
 *                              e.g 'core/image' or 'coblocks/accordion'.
 * @param {boolean} clearEditor Should clear editor of all blocks
 */
export function addBlockToPost( blockName, clearEditor = false ) {
	const blockCategory = blockName.split( '/' )[ 0 ] || false;
	const blockID = blockName.split( '/' )[ 1 ] || false;

	if ( ! blockCategory || ! blockID ) {
		return;
	}

	if ( clearEditor ) {
		clearBlocks();
	}

	cy.get( '.edit-post-header [aria-label="Add block"], .edit-site-header [aria-label="Add block"], .edit-post-header-toolbar__inserter-toggle' ).click();
	cy.get( '.block-editor-inserter__search-input,input.block-editor-inserter__search' ).click().type( blockName );

	const targetClassName = ( blockCategory === 'core' ? '' : `-${ blockCategory }` ) + `-${ blockID }`;
	cy.get( '.editor-block-list-item' + targetClassName ).first().click( { force: true } );

	// Make sure the block was added to our page
	cy.get( `[class*="-visual-editor"] [data-type="${ blockName }"]` ).should( 'exist' ).then( () => {
		// Then close the block inserter if still open.
		const inserterButton = Cypress.$( 'button[class*="__inserter-toggle"].is-pressed' );
		if ( !! inserterButton.length ) {
			cy.get( 'button[class*="__inserter-toggle"].is-pressed' ).click();
		}
	} );
}

/**
 * From inside the WordPress editor open the CoBlocks Gutenberg editor panel
 */
export function savePage() {
	cy.get( '.edit-post-header__settings button.is-primary' ).click();

	cy.get( '.components-editor-notices__snackbar', { timeout: 10000 } ).should( 'not.be.empty' );

	// Reload the page to ensure that we're not hitting any block errors
	//cy.reload();
}

/**
 * Check the page for block errors
 *
 * @param {string} blockName blockName the block to check for
 *                           e.g 'core/image' or 'coblocks/accordion'.
 */

export function checkForBlockErrors( blockName ) {
	disableGutenbergFeatures();

	cy.get( '.block-editor-warning' ).should( 'not.exist' );

	cy.get( 'body.php-error' ).should( 'not.exist' );

	cy.get( `[data-type="${ blockName }"]` ).should( 'exist' );
}

/**
 * View the currently edited page on the front of site
 */
export function viewPage() {
	cy.get( 'button[aria-label="Settings"]' ).then( ( settingsButton ) => {
		if ( ! Cypress.$( settingsButton ).hasClass( 'is-pressed' ) && ! Cypress.$( settingsButton ).hasClass( 'is-toggled' ) ) {
			cy.get( settingsButton ).click();
		}
	} );

	cy.get( 'button[data-label="Post"]' );

	openSettingsPanel( /permalink/i );

	cy.get( '.edit-post-post-link__link' ).then( ( pageLink ) => {
		const linkAddress = Cypress.$( pageLink ).attr( 'href' );
		cy.visit( linkAddress );
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
	getWindowObject().then( ( safeWin ) => {
		safeWin.wp.data.dispatch( 'core/block-editor' ).removeBlocks(
			safeWin.wp.data.select( 'core/block-editor' ).getBlocks().map( ( block ) => block.clientId )
		);
	} );
}

/**
 * Attempts to retrieve the block name from the current spec file being run
 * eg: accordion.js => Accordion
 */
export function getBlockName() {
	const specFile = Cypress.spec.name;
	const fileBase = capitalize( specFile.split( '/' ).pop().replace( '.cypress.js', '' ).replace( '-', ' ' ) );
	const blockName = fileBase.charAt( 0 ).toUpperCase() + fileBase.slice( 1 );

	return blockName;
}

/**
 * Attempts to retrieve the block slug from the current spec file being run
 * eg: accordion.js => accordion
 */
export function getBlockSlug() {
	const specFile = Cypress.spec.name;
	const fileBase = ( specFile.split( '/' ).pop().replace( '.cypress.js', '' ) );

	return fileBase;
}

/**
 * Click on a style button within the style panel
 *
 * @param {string} style Name of the style to apply
 */
export function setBlockStyle( style ) {
	openSettingsPanel( RegExp( 'styles', 'i' ) );

	cy.get( '.edit-post-sidebar [class*="editor-block-styles"]' )
		.contains( RegExp( style, 'i' ) )
		.click( { force: true } );
}

/**
 * Select the block using the Block navigation component.
 * Input parameter is the name of the block to select.
 *
 * @param {string}  name         The name of the block to select eg: highlight or click-to-tweet
 * @param {boolean} isChildBlock Optional selector for children blocks. Default will be top level blocks.
 */
export function selectBlock( name, isChildBlock = false ) {
	cy.get( '.edit-post-header__toolbar' ).find( '.block-editor-block-navigation,.edit-post-header-toolbar__list-view-toggle' ).click();
	cy.get( '.block-editor-block-navigation-leaf' ).contains( isChildBlock ? RegExp( `${ name }$`, 'i' ) : RegExp( name, 'i' ) ).click().then( () => {
		// Then close the block navigator if still open.
		const inserterButton = Cypress.$( '.edit-post-header__toolbar button.edit-post-header-toolbar__list-view-toggle.is-pressed' );
		if ( !! inserterButton.length ) {
			cy.get( '.edit-post-header__toolbar button.edit-post-header-toolbar__list-view-toggle.is-pressed' ).click();
		}
	} );
}

/**
 * Set a value within the input box
 *
 * @param {string}  panelName   Name of the panel to open
 * @param {string}  settingName The name of the setting to search for
 * @param {string}  value       The value to type
 * @param {boolean} ignoreCase  Optional case sensitivity. Default will ignore case.
 */
export function setInputValue( panelName, settingName, value, ignoreCase = true ) {
	openSettingsPanel( ignoreCase ? RegExp( panelName, 'i' ) : panelName );

	cy.get( '.edit-post-sidebar' )
		.contains( ignoreCase ? RegExp( settingName, 'i' ) : settingName ).not( '.block-editor-block-card__description' )
		.then( ( $settingSection ) => {
			cy.get( Cypress.$( $settingSection ).parent() )
				.find( 'input[type="number"]' )
				.focus()
				.type( `{selectall}${ value }` );
		} );
}

/**
 * Upload helper object. Contains image fixture spec and uploader function.
 * `helpers.upload.spec` Object containing image spec.
 * `helpers.upload.imageToBlock` Function performs upload action on specified block.
 * `helpers.upload.imageReplaceFlow` Function performs replace action on specified block.
 */
export const upload = {
	/**
	 * Upload image to input element and trigger replace image flow.
	 *
	 * @param {string} blockName The name of the block that is replace target
	 *                           imageReplaceFlow works with CoBlocks Galleries: Carousel, Collage, Masonry, Offset, Stacked.
	 */
	imageReplaceFlow: ( blockName ) => {
		const selectBlockBy = blockName.split( '-' )?.[ 1 ];

		upload.imageToBlock( blockName );

		selectBlock( selectBlockBy );

		cy.get( '.coblocks-gallery-item__button-replace' ).should( 'not.exist' );

		cy.get( `[class*="-visual-editor"] [data-type="${ blockName }"] img` ).first().click( { force: true } );

		cy.get( '.coblocks-gallery-item__button-replace' ).click( { force: true } );

		cy.get( '#menu-item-browse' ).click();

		cy.get( 'ul.attachments' );

		// Replace the image.
		const newImageBase = 'R150x150';
		const newFilePath = `../.dev/tests/cypress/fixtures/images/${ newImageBase }.png`;
		/* eslint-disable */
		cy.fixture( newFilePath ).then( ( fileContent ) => {
			cy.get( '[class^="moxie"] [type="file"]' )
			.attachFile( { fileContent, filePath: newFilePath, mimeType: 'image/png' }, { force: true } );
		} );
		/* eslint-enable */

		cy.get( '.attachment.selected.save-ready' );
		cy.get( '.media-modal .media-button-select' ).click();

		cy.get( '[class*="-visual-editor"]' ).find( `[data-type="${ blockName }"] img` ).first().should( 'have.attr', 'src' ).should( 'include', newImageBase );
	},
	/**
	 * Upload image to input element.
	 *
	 * @param {string} blockName The name of the block that is upload target
	 *                           e.g 'core/image' or 'coblocks/accordion'.
	 */
	imageToBlock: ( blockName ) => {
		const { fileName, pathToFixtures } = upload.spec;
		cy.fixture( pathToFixtures + fileName ).then( ( fileContent ) => {
			cy.get( `[data-type="${ blockName }"] input[type="file"]` )
				.attachFile( { fileContent, filePath: pathToFixtures + fileName, mimeType: 'image/png' }, { force: true } );

			// Now validate upload is complete and is not a blob.
			cy.get( `[class*="-visual-editor"] [data-type="${ blockName }"] [src^="http"]` );
		} );
	},
	spec: {
		fileName: '150x150.png',
		imageBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
	},
};

/**
 * Set a Color Setting value to a custom hex color
 *
 * @param {string} settingName The setting to update. background|text
 * @param {string} hexColor
 */
export function setColorSetting( settingName, hexColor ) {
	openSettingsPanel( /color settings|color/i );
	cy.get( '.components-base-control__field' )
		.contains( RegExp( settingName, 'i' ) )
		.then( ( $subColorPanel ) => {
			cy.get( Cypress.$( $subColorPanel ).closest( '.components-base-control' ) )
				.contains( /custom color/i )
				.click();
			cy.get( '.components-color-picker__inputs-field input[type="text"]' )
				.clear()
				.type( hexColor );
			cy.get( Cypress.$( $subColorPanel ).closest( '.components-base-control' ) )
				.contains( /custom color/i )
				.click();
		} );
}

/**
 * Open a certain settings panel in the right hand sidebar of the editor
 *
 * @param {RegExp} panelText The panel label text to open. eg: Color Settings
 */
export function openSettingsPanel( panelText ) {
	cy.get( '.components-panel__body' )
		.contains( panelText )
		.then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.trigger( 'click' );
			}
		} );
}

/**
 * Open a block heading controls located in block toolbar.
 *
 * @param {number} headingLevel The button that should be located and clicked
 */
export function openHeadingToolbarAndSelect( headingLevel ) {
	cy.get( '.block-editor-block-toolbar .block-editor-block-toolbar__slot button' ).each( ( button, index ) => {
		if ( index === 1 ) { // represents the second position in the toolbar
			cy.get( button ).click( { force: true } );
		}
	} );
	cy.get( '.components-popover__content div[role="menu"] button' ).contains( headingLevel ).focus().click();
}

/**
 * Toggle an checkbox in the settings panel of the block editor
 *
 * @param {string} checkboxLabelText The checkbox label text. eg: Drop Cap
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
 * @param {string} classes Custom classe(s) to add to the block
 * @param {string} blockID The name of the block e.g. (accordion, alert, map)
 */
export function addCustomBlockClass( classes, blockID = '' ) {
	if ( ! blockID.length ) {
		blockID = getBlockSlug();
	}

	// Force click the target element so that we don't select any innerBlocks by mistake.
	cy.get( '[class*="-visual-editor"] .wp-block[data-type="coblocks/' + blockID + '"]' ).last().click( { force: true } );

	cy.get( '.block-editor-block-inspector__advanced' ).scrollIntoView().find( 'button' ).click();

	cy.get( 'div.edit-post-sidebar' )
		.contains( /Additional CSS/i )
		.next( 'input' )
		.then( ( $inputElem ) => {
			cy.get( $inputElem ).invoke( 'val' ).then( ( val ) => {
				if ( val.length > 0 ) {
					cy.get( $inputElem ).type( `{selectall}${ [ val, classes ].join( ' ' ) }` );
				} else {
					cy.get( $inputElem ).type( classes );
				}
			} );
		} );
}

/**
 * Press the Undo button in the header toolbar.
 */
export function doEditorUndo() {
	cy.get( '.editor-history__undo' ).click( { force: true } );
}

/**
 * Press the Redo button in the header toolbar.
 */
export function doEditorRedo() {
	cy.get( '.editor-history__redo' ).click();
}

/**
 * Open the Editor Settings panel.
 */
export function openEditorSettingsModal() {
	// Open "more" menu.
	cy.get( '.edit-post-more-menu button' ).click();
	cy.get( '.components-menu-group' ).contains( 'Editor settings' ).click();

	cy.get( '.components-modal__frame' ).contains( 'Editor settings' ).should( 'exist' );

	// Ensure settings have loaded.
	cy.get( '.coblocks-settings-modal input[type="checkbox"]' ).should( 'have.length', 6 );
}

/**
 * Turn off a setting from the Editor Settings panel.
 *
 * @param {string} settingName The label of the setting control.
 */
export function turnOffEditorSetting( settingName ) {
	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' )
		.then( ( element ) => {
			if ( element[ 0 ].checked ) {
				element.click();
			}
		} );

	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' ).should( 'not.be.checked' );
}

/**
 * Turn on a setting from the Editor Settings panel.
 *
 * @param {string} settingName The label of the setting control.
 */
export function turnOnEditorSetting( settingName ) {
	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' )
		.then( ( element ) => {
			if ( ! element[ 0 ].checked ) {
				element.click();
			}
		} );

	cy.get( '.components-base-control' ).contains( settingName ).parent().find( 'input[type=checkbox]' ).should( 'be.checked' );
}

/**
 * Helper method to convert a hex value to an RGB value
 *
 * @param {string} hex Hex string. eg: #55e7ff
 * @return {string} RGB string.
 */
export function hexToRGB( hex ) {
	let r = 0;
	let g = 0;
	let b = 0;

	// 3 digits
	if ( hex.length === 4 ) {
		r = '0x' + hex[ 1 ] + hex[ 1 ];
		g = '0x' + hex[ 2 ] + hex[ 2 ];
		b = '0x' + hex[ 3 ] + hex[ 3 ];
	// 6 digits
	} else if ( hex.length === 7 ) {
		r = '0x' + hex[ 1 ] + hex[ 2 ];
		g = '0x' + hex[ 3 ] + hex[ 4 ];
		b = '0x' + hex[ 5 ] + hex[ 6 ];
	}

	return 'rgb(' + +r + ', ' + +g + ', ' + +b + ')';
}

/**
 * Capitalize the first letter of each word in a string.
 * eg: hello world => Hello World
 *
 * @param {string} string The text to capitalize.
 * @return {string} Altered string with capitalized letters.
 */
export function capitalize( string ) {
	return string.replace( /(?:^|\s)\S/g, function( a ) {
		return a.toUpperCase();
	} );
}

/**
 * Toggle a checkbox in the settings panel of the block editor
 *
 * @param {string} text The checkbox label text. eg: Facebook
 */
export function toggleSocialNetwork( text ) {
	cy.get( '.components-checkbox-control__label' )
		.contains( text )
		.parent( '.components-base-control__field' )
		.find( '.components-checkbox-control__input-container' )
		.click();
}

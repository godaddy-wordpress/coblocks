/**
 * Returns true if styles tab exists false otherwise.
 */
export function selectStylesTabIfExists() {
	cy.get( '.edit-post-sidebar' ).find( 'button[aria-label="Styles"]' ).click();
}

/**
 * Add Form block child element by name.
 *
 * @param {string} name the name of the child block to add.
 */
export function addFormChild( name ) {
	cy.get( '[data-type="coblocks/form"] [data-type^="coblocks/field"]' ).first().click( { force: true } );
	cy.get( '.block-editor-block-settings-menu' ).click();
	cy.get( '.components-popover__content button' ).contains( /insert after|add after/i ).click( { force: true } );
	cy.get( '[data-type="coblocks/form"] [data-type="core/paragraph"]' ).click( { force: true } );

	cy.get( '.edit-post-header-toolbar' ).find( '.edit-post-header-toolbar__inserter-toggle' ).click( { force: true } );
	cy.get( '.block-editor-inserter__search .components-search-control__input' ).click().type( name );

	cy.get( '.editor-block-list-item-coblocks-field-' + name ).first().click( { force: true } );
	cy.get( `[data-type="coblocks/field-${ name }"]` ).should( 'exist' ).click( { force: true } );
}

/**
 * Login to our test WordPress site
 */
export function loginToSite() {
	return goTo( '/wp-login.php', true )
		.then( () => {
			cy.wait( 250 );

			cy.get( '#user_login' ).type( Cypress.env( 'wpUsername' ) );
			cy.get( '#user_pass' ).type( Cypress.env( 'wpPassword' ) );
			cy.get( '#wp-submit' ).click();
		} );
}

/**
 * Go to a specific URI.
 *
 * @param {string}  path  The URI path to go to.
 * @param {boolean} login If this is a login page.
 */
export function goTo( path = '/wp-admin', login = false ) {
	return cy.visit( Cypress.env( 'testURL' ) + path ).then( () => {
		return login ? cy.window().then( ( win ) => {
			return win;
		} ) : getWPDataObject();
	} );
}

/**
 * Safely obtain the window data object or error
 * when the window object is not available.
 */
export function getWPDataObject() {
	return cy.window().its( 'wp' ).then( ( wp ) => {
		return wp.data;
	} );
}

/**
 * Safely obtain the window blocks object or error
 * when the window object is not available.
 */
export function getWPBlocksObject() {
	return cy.window().its( 'wp' ).then( ( wp ) => {
		return wp.blocks;
	} );
}

/**
 * Disable Gutenberg Tips
 */
export function disableGutenbergFeatures() {
	return getWPDataObject().then( ( data ) => {
		// Enable "Top Toolbar"
		if ( ! data.select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ) ) {
			data.dispatch( 'core/edit-post' ).toggleFeature( 'fixedToolbar' );
		}

		if ( data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' ) ) {
			data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );
		}

		data.dispatch( 'core/editor' ).disablePublishSidebar();
	} );
}

/**
 * From inside the WordPress editor insert a block by blockName.
 * This function has changed to insert blocks by the via dispatch to `core/block-editor`.
 * The old method, using the inserter with Cypress triggers a race condition crashing the editor.
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

	// Ensure editor is ready for blocks.
	cy.get( '.is-root-container.wp-block-post-content' );

	/**
	 * Insert the block using dispatch to avoid the block inserter
	 *
	 * Note: This method is preferred over the old method because
	 * we do not need to test the Core controls around block insertion.
	 */
	getWPDataObject().then( ( data ) => {
		getWPBlocksObject().then( ( blocks ) => {
			data.dispatch( 'core/block-editor' ).insertBlock(
				blocks.createBlock( blockName )
			);
		} );
	} );

	// Make sure the block was added to our page
	cy.get( `[class*="-visual-editor"] [data-type="${ blockName }"]` ).should( 'exist' );

	// Give a short delay for blocks to render.
	cy.wait( 250 );
}

export function addNewGroupToPost() {
	clearBlocks();

	cy.get( '.edit-post-header [aria-label="Add block"], .edit-site-header [aria-label="Add block"], .edit-post-header-toolbar__inserter-toggle' ).click();
	cy.get( '.block-editor-inserter__search-input,input.block-editor-inserter__search, .components-search-control__input' ).click().type( 'group' );

	cy.wait( 1000 );

	cy.get( '.block-editor-block-types-list__list-item' ).contains( 'Group' ).click();

	// Make sure the block was added to our page
	cy.get( `[class*="-visual-editor"] [data-type='core/group']` ).should( 'exist' ).then( () => {
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

	cy.get( '.components-editor-notices__snackbar', { timeout: 120000 } ).should( 'not.be.empty' );

	// Reload the page to ensure that we're not hitting any block errors
	cy.reload();
}

/**
 * Check the page for block errors
 *
 * @param {string} blockName blockName the block to check for
 *                           e.g 'core/image' or 'coblocks/accordion'.
 */

export function checkForBlockErrors( blockName ) {
	// Ensure editor is ready for blocks.
	cy.get( '.is-root-container.wp-block-post-content' );

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

	cy.get( '.edit-post-post-url__dropdown button' ).click();

	cy.get( '.editor-post-url__link' ).then( ( pageLink ) => {
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
	getWPDataObject().then( ( data ) => {
		data.dispatch( 'core/block-editor' ).removeBlocks(
			data.select( 'core/block-editor' ).getBlocks().map( ( block ) => block.clientId )
		);
	} );
}

/**
 * Attempts to retrieve the block slug from the current spec file being run
 * eg: accordion.js => accordion
 */
export function getBlockSlug() {
	const specFile = Cypress.spec.name;

	return ( specFile.split( '/' ).pop().replace( '.cypress.js', '' ) );
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
		.click();
}

/**
 * Click on a style button within the new style panel
 *
 * @param {string} style Name of the style to apply
 */
export function setNewBlockStyle( style ) {
	selectStylesTabIfExists();

	cy.get( '.edit-post-sidebar [class*="editor-block-styles"]' )
		.contains( RegExp( style, 'i' ) )
		.click();
}

/**
 * Select the block using the Block navigation component.
 * Input parameter is the name of the block to select.
 * Allows chaining.
 *
 * @param {string} name The name of the block to select eg: highlight or click-to-tweet
 */
export function selectBlock( name ) {
	/**
	 * There are network requests taking place to the REST API to get the blocks and block patterns.
	 * Sometimes these requests occur and other times they are cached and are not called.
	 * For that reason is difficult to assert against those requests from core code.
	 * We introduce an arbitrary wait to avoid a race condition by interacting too quickly.
	 */
	cy.wait( 1000 );

	// `data-type` includes lower case name and `data-title` includes upper case name.
	// Allows for case-insensitive search.
	cy.get(	`[data-type*="${ name }"], [data-title*="${ name }"]` )
		.invoke( 'attr', 'data-block' )
		.then( ( clientId ) => {
			cy.window().then( ( win ) => {
				// Open the block sidebar.
				win.wp.data.dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' );
				win.wp.data.dispatch( 'core/block-editor' ).selectBlock( clientId );
			} );
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
	 * @param {string} blockName The name of the block that is replacing target
	 *                           imageReplaceFlow works with CoBlocks Galleries: Carousel, Collage, Masonry, Offset, Stacked.
	 */
	imageReplaceFlow: ( blockName ) => {
		const selectBlockBy = blockName.split( '-' )?.[ 1 ];

		upload.imageToBlock( blockName );

		selectBlock( selectBlockBy );

		cy.get( '.coblocks-gallery-item__button-replace' ).should( 'not.exist' );

		cy.get( `[class*="-visual-editor"] [data-type="${ blockName }"]` ).click();

		cy.get( `[class*="-visual-editor"] [data-type="${ blockName }"] img` ).first().click( { force: true } );

		cy.get( '.coblocks-gallery-item__button-replace' ).click( { force: true } );

		cy.get( '#menu-item-browse' ).click();

		cy.get( 'ul.attachments' );

		// Replace the image.
		const newImageBase = 'R150x150';
		const newFilePath = `../.dev/tests/cypress/fixtures/images/${ newImageBase }.png`;

		cy.fixture( newFilePath, { encoding: null } ).then( ( fileContent ) => {
			cy.get( '[class^="moxie"] [type="file"]' ).selectFile( { contents: fileContent, fileName: newFilePath, mimeType: 'image/png' }, { force: true } );
		} );

		cy.get( '.attachment.selected.save-ready' );
		cy.get( '.media-modal .media-button-select' ).click();

		cy.get( '[class*="-visual-editor"]' ).find( `[data-type="${ blockName }"] img` ).first().should( 'have.attr', 'src' ).should( 'include', newImageBase );
	},
	/**
	 * Upload image to input element.
	 *
	 * @param {string}  blockName The name of the block that is upload target
	 *                            e.g 'core/image' or 'coblocks/accordion'.
	 * @param {boolean} allBlocks Whether to iterate and upload to all block dropzone selectors.
	 */
	imageToBlock: ( blockName, allBlocks = false ) => {
		const { fileName, pathToFixtures } = upload.spec;
		let fileContent;

		cy.fixture( pathToFixtures + fileName, { encoding: null } ).then( ( fileCont ) => {
			fileContent = fileCont;

			if ( allBlocks ) {
				cy.get( `[data-type="${ blockName }"] .components-drop-zone` ).each( ( zone ) => {
					cy.wrap( zone ).selectFile( { contents: fileContent, fileName: pathToFixtures + fileName, mimeType: 'image/png' }, { action: 'drag-drop', force: true } );
				} );
			} else {
				cy.get( `[data-type="${ blockName }"] .components-drop-zone` ).first()
					.selectFile( { contents: fileContent, fileName: pathToFixtures + fileName, mimeType: 'image/png' }, { action: 'drag-drop', force: true } );
			}
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
export function setColorSettingsFoldableSetting( settingName, hexColor ) {
	const formattedHex = hexColor.split( '#' )[ 1 ];

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' ).contains( settingName, { matchCase: false } ).click();

	if ( isWP63AtLeast() ) {
		cy.get( '.components-color-palette__custom-color-button' ).click();
	} else {
		cy.get( '.components-color-palette__custom-color' ).click();
	}

	cy.get( '.components-color-picker' ).find( '.components-input-control__input' ).click().clear().type( formattedHex );

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' )
		.contains( settingName, { matchCase: false } )
		.click( { force: true } );
}

export function setColorPanelSetting( settingName, hexColor ) {
	const formattedHex = hexColor.split( '#' )[ 1 ];

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' ).contains( settingName, { matchCase: false } ).click();

	if ( isWP63AtLeast() ) {
		cy.get( '.components-color-palette__custom-color-button' ).click();
	} else {
		cy.get( '.components-color-palette__custom-color' ).click();
	}

	cy.get( '.components-color-picker' ).find( '.components-input-control__input' ).click().clear().type( formattedHex );

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' ).contains( settingName, { matchCase: false } ).click();
}

/**
 * Open a certain settings panel in the right hand sidebar of the editor
 *
 * @param {RegExp} panelText The panel label text to open. eg: Color Settings
 */
export function openSettingsPanel( panelText ) {
	// Ensure block tab is selected.
	if ( Cypress.$( 'button[data-label="Block"]:not(.is-active)' ) ) {
		cy.get( 'button[data-label="Block"]' ).click();
	}

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
	// Button has aria label select the heading
	if ( Cypress.$( '.block-editor-block-toolbar .block-editor-block-toolbar__slot button[aria-label="Change heading level"]' ) ) {
		cy.get( '.block-editor-block-toolbar .block-editor-block-toolbar__slot button[aria-label="Change heading level"]' ).click();
		cy.get( '.components-popover__content div[role="menu"] button' ).contains( headingLevel ).focus().click();
	} else {
		// No aria label present. Attempt to set using old method.

		cy.get( '.block-editor-block-toolbar .block-editor-block-toolbar__slot button' ).each( ( button, index ) => {
			if ( index === 1 ) { // represents the second position in the toolbar
				cy.get( button ).click( { force: true } );
			}
		} );
		cy.get( '.components-popover__content div[role="menu"] button' ).contains( headingLevel ).focus().click();
	}
}

/**
 * Toggle a checkbox in the settings panel of the block editor
 *
 * @param {string} checkboxLabelText The checkbox label text. eg: Drop Cap
 */
export function toggleSettingCheckbox( checkboxLabelText ) {
	cy.get( '.components-toggle-control__label' )
		.contains( checkboxLabelText )
		.closest( '.components-base-control__field' )
		.find( '.components-form-toggle__input' )
		.click();
}

/**
 * Add custom classes to a block
 *
 * @param {string} classes Custom class(es) to add to the block
 * @param {string} blockID The name of the block e.g. (accordion, alert, map)
 */
export function addCustomBlockClass( classes, blockID = '' ) {
	if ( ! blockID.length ) {
		blockID = getBlockSlug();
	}

	// Force click the target element so that we don't select any innerBlocks by mistake.
	cy.get( '[class*="-visual-editor"] .wp-block[data-type="coblocks/' + blockID + '"]' ).last().click( { force: true } );

	cy.get( '.block-editor-block-inspector__advanced' ).scrollIntoView().find( 'button' ).then( ( $btn ) => {
		const isOpen = $btn.attr( 'aria-expanded' );
		if ( 'false' === isOpen ) {
			cy.wrap( $btn ).click();
		}
	} );

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
 * Open the CoBlocks Labs modal.
 */
export function openCoBlocksLabsModal() {
	// Open "more" menu.
	cy.get( '.edit-post-more-menu button, .interface-more-menu-dropdown button' ).click();
	cy.get( '.components-menu-group' ).contains( 'CoBlocks Labs' ).click();

	cy.get( '.components-modal__frame' ).contains( 'CoBlocks Labs' ).should( 'exist' );
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

export function isNotWPLocalEnv() {
	return Cypress.env( 'testURL' ) !== 'http://localhost:8889';
}

// A condition to determine if we are testing on WordPress 6.3+
// This function should be removed in the process of the work for WP 6.4 compatibility
export function isWP63AtLeast() {
	return Cypress.$( "[class*='branch-6-3']" ).length > 0 || Cypress.$( "[class*='branch-6-4']" ).length > 0;
}

function getIframeDocument( containerClass ) {
	return cy.get( containerClass + ' iframe' ).its( '0.contentDocument' ).should( 'exist' );
}

export function getIframeBody( containerClass ) {
	return getIframeDocument( containerClass ).its( 'body' ).should( 'not.be.undefined' )
		// wraps "body" DOM element to allow
		// chaining more Cypress commands, like ".find(...)"
		.then( cy.wrap );
}

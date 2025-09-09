/**
 * Returns true if styles tab exists false otherwise.
 */
export function selectStylesTabIfExists() {
	cy.get( sidebarClass() ).find( 'button[aria-label="Styles"]' ).click();
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

	if ( isWP65AtLeast() ) {
		cy.get( '.edit-post-header-toolbar' ).find( '.editor-document-tools__inserter-toggle' ).click( { force: true } );

		cy.get( '.components-input-control__input' ).click().type( name );
	} else {
		cy.get( '.edit-post-header-toolbar' ).find( '.edit-post-header-toolbar__inserter-toggle' ).click( { force: true } );

		cy.get( '.block-editor-inserter__search .components-search-control__input' ).click().type( name );
	}

	cy.get( '.editor-block-list-item-coblocks-field-' + name ).first().click( { force: true } );
	cy.get( `[data-type="coblocks/field-${ name }"]` ).should( 'exist' ).click( { force: true } );
}

/**
 * Login to our test WordPress site
 */
export function loginToSite() {
	return goTo( '/wp-login.php', true )
		.then( () => {
			// Arbitrary wait to ensure the login form is ready in CI
			cy.wait( 1000 );
			// Wait for login form to be ready
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
 * Wait for WordPress data stores to be fully initialized.
 * This prevents race conditions where wp.data exists but stores aren't registered yet.
 */
export function waitForDataStores() {
	return cy.window().should( ( win ) => {
		// eslint-disable-next-line no-unused-expressions
		expect( win.wp ).to.exist;
		// eslint-disable-next-line no-unused-expressions
		expect( win.wp.data ).to.exist;
		// eslint-disable-next-line no-unused-expressions
		expect( win.wp.data.select ).to.be.a( 'function' );

		// Ensure core stores are registered
		const coreEditPostSelect = win.wp.data.select( 'core/edit-post' );
		// eslint-disable-next-line no-unused-expressions
		expect( coreEditPostSelect ).to.exist;
		// eslint-disable-next-line no-unused-expressions
		expect( coreEditPostSelect.isFeatureActive ).to.be.a( 'function' );
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
	return waitForDataStores().then( () => {
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
	waitForDataStores().then( () => {
		getWPDataObject().then( ( data ) => {
			getWPBlocksObject().then( ( blocks ) => {
				data.dispatch( 'core/block-editor' ).insertBlock(
					blocks.createBlock( blockName )
				);
			} );
		} );
	} );

	// Make sure the block was added to our page
	cy.get( `[class*="-visual-editor"] [data-type="${ blockName }"]` ).should( 'exist' );

	// Instead of arbitrary wait, wait for the block to be fully rendered
	// This means waiting for the block to not have loading states
	cy.get( `[data-type="${ blockName }"]` ).should( ( $block ) => {
		// The block should be stable (not detaching/reattaching)
		expect( $block ).to.have.length.at.least( 1 );
		// The block should have its content loaded (not just a placeholder)
		expect( $block.html() ).to.have.length.greaterThan( 50 );
	} );

	// Also ensure the block has finished its initial render cycle
	cy.get( `[data-type="${ blockName }"]` ).should( 'not.have.class', 'is-loading' );

	// For gallery blocks specifically, wait for upload UI to be ready and stable
	if ( blockName.includes( 'gallery' ) ) {
		// Wait for the upload interface to be available
		cy.get( `[data-type="${ blockName }"]` ).should( ( $block ) => {
			const text = $block.text();
			expect( text ).to.satisfy( ( content ) =>
				content.includes( 'Upload' ) || content.includes( 'Select' ) || content.includes( 'Media Library' )
			);
		} );

		// Gallery blocks need a small stabilization period to prevent DOM detachment.
		cy.wait( 150 );
	}
}

export function addNewGroupToPost() {
	clearBlocks();

	if ( isWP65AtLeast() ) {
		cy.get( '.editor-document-tools__inserter-toggle' ).click();

		cy.get( '.components-input-control__input' ).click().type( 'group' );
	} else {
		cy.get( '.edit-post-header [aria-label="Add block"], .edit-site-header [aria-label="Add block"], .edit-post-header-toolbar__inserter-toggle' ).click();

		cy.get( '.block-editor-inserter__search-input,input.block-editor-inserter__search, .components-search-control__input' ).click().type( 'group' );
	}

	// Wait for search results to appear
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
	// Try multiple selectors for cross-version compatibility (WP 6.5-6.8.2)
	cy.get( 'body' ).then( ( $body ) => {
		if ( $body.find( '.editor-header__settings button.is-primary' ).length > 0 ) {
			// WP 6.6+ selector
			cy.get( '.editor-header__settings button.is-primary' ).click();
		} else if ( $body.find( '.edit-post-header__settings button.is-primary' ).length > 0 ) {
			// WP 6.5 and earlier selector
			cy.get( '.edit-post-header__settings button.is-primary' ).click();
		} else if ( $body.find( '.edit-post-header-toolbar__settings button.is-primary' ).length > 0 ) {
			// Alternative pattern
			cy.get( '.edit-post-header-toolbar__settings button.is-primary' ).click();
		} else {
			// Generic fallback
			cy.get( 'button.is-primary' ).contains( /save|publish|update/i ).click();
		}
	} );

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
	// Open settings panel if not already open
	cy.get( 'body' ).then( ( $body ) => {
		const settingsButton = $body.find( 'button[aria-label="Settings"]' );
		if ( settingsButton.length > 0 && ! settingsButton.hasClass( 'is-pressed' ) && ! settingsButton.hasClass( 'is-toggled' ) ) {
			cy.get( 'button[aria-label="Settings"]' ).click();
		}
	} );

	// Wait for the settings panel to be visible
	cy.get( '.interface-interface-skeleton__sidebar' ).should( 'be.visible' );

	// Try multiple approaches to find the post URL
	cy.get( 'body' ).then( ( $body ) => {
		if ( $body.find( '[data-tab-id="edit-post/document"]' ).length > 0 ) {
			// WP 6.5+ approach
			cy.get( '[data-tab-id="edit-post/document"]' ).click();
			// Wait for document tab to become active
			cy.get( '[data-tab-id="edit-post/document"]' ).should( 'have.attr', 'aria-selected', 'true' );
		}

		// Try different selectors for the URL dropdown
		if ( $body.find( '.editor-post-url__panel-dropdown button' ).length > 0 ) {
			cy.get( '.editor-post-url__panel-dropdown button' ).click();
		} else if ( $body.find( '.edit-post-post-url__dropdown button' ).length > 0 ) {
			cy.get( '.edit-post-post-url__dropdown button' ).click();
		} else if ( $body.find( 'button[data-label="Post"]' ).length > 0 ) {
			cy.get( 'button[data-label="Post"]' ).click();
			cy.get( '.edit-post-post-url__dropdown button' ).click();
		} else {
			// Fallback: look for any URL-related dropdown
			cy.get( '[class*="url"], [class*="permalink"]' ).find( 'button' ).first().click();
		}
	} );

	// Get the link and visit it
	cy.get( '.editor-post-url__link, .edit-post-post-url__link' ).then( ( pageLink ) => {
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
 * Clear all blocks from the editor and wait for them to be fully removed
 */
export function clearBlocks() {
	waitForDataStores().then( () => {
		getWPDataObject().then( ( data ) => {
			data.dispatch( 'core/block-editor' ).removeBlocks(
				data.select( 'core/block-editor' ).getBlocks().map( ( block ) => block.clientId )
			);
		} );
	} );

	// Simple wait and verify no blocks remain
	cy.get( '.block-editor-block-list__layout' ).should( 'not.contain', '[data-type]' );
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

	cy.get( sidebarClass() + ' [class*="editor-block-styles"]' )
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

	cy.get( sidebarClass() + ' [class*="editor-block-styles"]' )
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
	 * Wait for the block to be available in the editor before attempting to select it.
	 * This replaces the arbitrary wait with a proper assertion.
	 */
	cy.get( `[data-type*="${ name }"], [data-title*="${ name }"]` ).should( 'exist' );

	let id = ''; // The block client ID.
	waitForDataStores().then( () => {
		cy.window().then( ( win ) => {
			// Prefer selector from data-store.
			id = win.wp.data.select( 'core/block-editor' ).getBlocks().filter( ( i ) => i?.name === name )[ 0 ]?.clientId;

			// Fallback to selector from DOM.
			if ( ! id ) {
				cy.get(	`[data-type*="${ name }"], [data-title*="${ name }"]` )
					.invoke( 'attr', 'data-block' )
					.then( ( clientId ) => id = clientId );
			}
		} );

		cy.window().then( ( win ) => {
			win.wp.data.dispatch( 'core/block-editor' ).selectBlock( id );
		} );

		cy.window().then( ( win ) => {
			win.wp.data.dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' );
		} );
	} );
	// Wait for sidebar to be visible
	cy.get( '.interface-interface-skeleton__sidebar' ).should( 'be.visible' );
}

/**
 * Helper function to set the block alignment.
 *
 * @param {string} alignment The alignment to set.
 *
 */
export function setBlockAlignment( alignment ) {
	// Open alignment toolbar for selected block.
	cy.get( '[aria-label="Change alignment"], [aria-label="Align"]' ).click();

	if ( alignment !== 'wide' && alignment !== 'full' ) { // Label prefixed with "Align".
		alignment = `Align ${ alignment }`;
	} else { // Label starts with capitalized letter.
		alignment = alignment.charAt( 0 ).toUpperCase() + alignment.slice( 1 );
	}

	cy.get( '[aria-label="Change alignment"], [aria-label="Align"]' ).contains( alignment ).click();
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

	cy.get( sidebarClass() )
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

		// Dismiss any popovers that might interfere with clicking
		dismissPopovers();

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

const customColorPalatteSelector = ( () => [
	'.components-color-palette__custom-color-button', // WP 6.3+
	'.components-color-palette__custom-color', // WP 6.2.
].join() )();

/**
 * Set a Color Setting value to a custom hex color
 *
 * @param {string} settingName The setting to update. background|text
 * @param {string} hexColor
 */
export function setColorSettingsFoldableSetting( settingName, hexColor ) {
	const formattedHex = hexColor.split( '#' )[ 1 ];

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' ).contains( settingName, { matchCase: false } ).click();

	cy.get( customColorPalatteSelector ).click();

	cy.get( '.components-color-picker' ).find( '.components-input-control__input' ).click().clear().type( formattedHex );

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' )
		.contains( settingName, { matchCase: false } )
		.click( { force: true } );
}

export function setColorPanelSetting( settingName, hexColor ) {
	const formattedHex = hexColor.split( '#' )[ 1 ];

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' ).contains( settingName, { matchCase: false } ).click();

	cy.get( customColorPalatteSelector ).click();

	cy.get( '.components-color-picker' ).find( '.components-input-control__input' ).click().clear().type( formattedHex );

	cy.get( '.block-editor-panel-color-gradient-settings__dropdown' ).contains( settingName, { matchCase: false } ).click();
}

/**
 * Open a certain settings panel in the right hand sidebar of the editor
 *
 * @param {RegExp} panelText The panel label text to open. eg: Color Settings
 */
export function openSettingsPanel( panelText ) {
	if ( isWP65AtLeast() ) {
		cy.get( '[data-tab-id="edit-post/block"]' ).click();
	} else {
		// Ensure block tab is selected.
		// eslint-disable-next-line no-lonely-if
		if ( Cypress.$( 'button[data-label="Block"]:not(.is-active)' ) ) {
			cy.get( 'button[data-label="Block"]' ).click();
		}
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
	// Atomic approach using should() to avoid DOM detachment
	cy.get( 'label' )
		.contains( checkboxLabelText )
		.should( ( $label ) => {
			const forAttr = $label.attr( 'for' );
			if ( forAttr ) {
				// Find and click the associated input directly in the callback
				const input = Cypress.$( `#${ forAttr }` )[ 0 ];
				if ( input ) {
					input.click();
				}
			} else {
				// Fallback: find input within the same control
				const control = $label.closest( '.components-base-control, .components-toggle-control' )[ 0 ];
				if ( control ) {
					const input = Cypress.$( control ).find( '.components-form-toggle__input, input[type="checkbox"]' )[ 0 ];
					if ( input ) {
						input.click();
					}
				}
			}
		} );
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

	cy.get( 'div' + sidebarClass() )
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
	cy.get( '.components-menu-group' ).contains( 'CoBlocks Labs' ).click( { force: true } );

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

export function isWP65AtLeast() {
	return Cypress.$( "[class*='branch-6-5']" ).length > 0 || Cypress.$( "[class*='branch-6-6']" ).length > 0;
}

export function isWP66AtLeast() {
	return Cypress.$( "[class*='branch-6-6']" ).length > 0 || Cypress.$( "[class*='branch-6-7']" ).length > 0;
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

export const sidebarClass = () => {
	return isWP66AtLeast() ? '.editor-sidebar__panel' : '.edit-post-sidebar';
};

/**
 * Click the settings/inspector button with cross-version compatibility
 */
export function openInspectorPanel() {
	// Try multiple selectors for cross-version compatibility (WP 6.5-6.8.2)
	cy.get( 'body' ).then( ( $body ) => {
		if ( $body.find( '.editor-header__settings' ).length > 0 ) {
			// WP 6.6+ selector
			cy.get( '.editor-header__settings' ).click();
		} else if ( $body.find( '.edit-post-header__settings' ).length > 0 ) {
			// WP 6.5 and earlier selector
			cy.get( '.edit-post-header__settings' ).click();
		} else if ( $body.find( '.edit-post-header-toolbar__settings' ).length > 0 ) {
			// Alternative pattern
			cy.get( '.edit-post-header-toolbar__settings' ).click();
		} else {
			// Generic fallback using aria-label
			cy.get( '[aria-label*="Settings"], [aria-label*="Inspector"]' ).click();
		}
	} );

	// Wait for sidebar to be visible and panels to load
	cy.get( '.interface-interface-skeleton__sidebar' ).should( 'be.visible' );

	// In newer WP versions, we need to click the "Block" tab to see block settings
	cy.get( 'body' ).then( ( $body ) => {
		const blockTab = $body.find( '[data-tab-id="edit-post/block"]' );
		if ( blockTab.length > 0 ) {
			// Click Block tab if it exists and isn't already selected
			if ( ! blockTab.attr( 'aria-selected' ) || blockTab.attr( 'aria-selected' ) === 'false' ) {
				cy.get( '[data-tab-id="edit-post/block"]' ).click();
				// Wait for panels to appear after clicking Block tab
				cy.get( '.components-panel__body-title' ).should( 'have.length.at.least', 1 );
			}
		} else {
			// For older versions without tabs, wait for panels to be visible
			cy.get( '.components-panel__body-title' ).should( 'have.length.at.least', 1 );
		}
	} );
}

/**
 * Dismiss any open popovers that might interfere with test interactions
 * This is particularly useful for rich text formatting toolbars that appear unexpectedly
 * and prevent clicking on gallery items or other elements.
 *
 * This function is backward compatible with existing test patterns that expect
 * formatting toolbars to appear/disappear in specific sequences.
 */
export function dismissPopovers() {
	// Only dismiss popovers if they are currently interfering with interactions
	cy.get( 'body' ).then( ( $body ) => {
		// Look for specifically problematic popovers that cover content
		const interferingPopovers = $body.find( '.components-popover.block-editor-rich-text__inline-format-toolbar.is-positioned:visible' );

		if ( interferingPopovers.length > 0 ) {
			// Use escape key to dismiss - this is the standard WordPress way
			cy.get( 'body' ).type( '{esc}' );
			// Brief wait for dismissal
			cy.wait( 100 );
		}
	} );

	// Additional check for any other visible popovers that might interfere
	cy.get( 'body' ).then( ( $body ) => {
		const otherPopovers = $body.find( '.components-popover:visible' );
		// Only dismiss if there are multiple popovers or if they're not expected rich text toolbars
		if ( otherPopovers.length > 1 ) {
			// Press escape to clear any unexpected popover stack
			cy.get( 'body' ).type( '{esc}' );
			cy.wait( 100 );
		}
	} );
}

/**
 * Open a specific panel in the inspector with cross-version compatibility
 *
 * @param {string} panelName - The name of the panel to open (case-insensitive)
 */
export function openInspectorPanelSection( panelName ) {
	// First ensure panels are loaded
	cy.get( '.components-panel__body-title' ).should( 'have.length.at.least', 1 );

	// Find the panel button and expand if needed
	cy.get( '.components-panel__body-title button' )
		.contains( new RegExp( panelName, 'i' ) )
		.then( ( $button ) => {
			const isExpanded = $button.attr( 'aria-expanded' ) === 'true';

			if ( ! isExpanded ) {
				cy.wrap( $button ).click();
				// Wait for panel to expand by checking aria-expanded again
				cy.get( '.components-panel__body-title button' )
					.contains( new RegExp( panelName, 'i' ) )
					.should( 'have.attr', 'aria-expanded', 'true' );
			}
		} );

	// For Link Settings specifically, wait for the SelectControl to render
	if ( panelName.toLowerCase().includes( 'link' ) ) {
		// Simply check that a select element exists somewhere in the expanded panel area
		cy.get( '.components-panel__body select' ).should( 'exist' );
	}
}

/**
 * Wait for and interact with the Link Settings dropdown
 * This is purpose-built for the gallery link functionality
 *
 * @param {string} linkType The type of link to select (e.g., 'custom', 'media', 'attachment', 'none')
 */
export function selectLinkOption( linkType ) {
	// Simple approach: find select element that should exist after panel expansion
	cy.get( '.components-panel__body select' )
		.should( 'be.visible' )
		.select( linkType );
}

/**
 * Complete helper function for testing custom link functionality in gallery blocks
 * Handles the full flow from block selection to URL input and verification
 *
 * @param {string} blockName     - The block name (e.g., 'coblocks/gallery-offset', 'coblocks/gallery-collage')
 * @param {string} customUrl     - The URL to set for the custom link
 * @param {string} imageSelector - CSS selector for the image element to verify link on
 */
export function setGalleryCustomLink( blockName, customUrl, imageSelector = 'img' ) {
	// Use the exact working workflow from debug test

	// Step 1: Block selection
	cy.get( `[data-type="${ blockName }"]` ).click();

	// Step 2: Open inspector and ensure it stays open
	cy.get( 'body' ).then( ( $body ) => {
		const sidebar = $body.find( '.interface-interface-skeleton__sidebar' );
		if ( ! sidebar.is( ':visible' ) ) {
			cy.get( '.editor-header__settings, .edit-post-header__settings' ).click();
		}
	} );
	cy.get( '.interface-interface-skeleton__sidebar' ).should( 'be.visible' );

	// Step 3: Ensure Block tab is active
	cy.get( '[data-tab-id="edit-post/block"]' ).then( ( $tab ) => {
		if ( $tab.attr( 'aria-selected' ) !== 'true' ) {
			cy.get( '[data-tab-id="edit-post/block"]' ).click();
		}
	} );
	cy.get( '[data-tab-id="edit-post/block"]' ).should( 'have.attr', 'aria-selected', 'true' );

	// Step 4: Expand Link Settings panel
	cy.get( '.components-panel__body-title button' ).contains( /link/i ).then( ( $button ) => {
		const isExpanded = $button.attr( 'aria-expanded' ) === 'true';
		if ( ! isExpanded ) {
			cy.wrap( $button ).click();
		}
	} );
	cy.get( '.components-panel__body-title button' ).contains( /link/i ).should( 'have.attr', 'aria-expanded', 'true' );

	// Step 5: Select custom link type
	cy.get( '.components-panel__body' ).contains( /link/i ).closest( '.components-panel__body' ).within( () => {
		cy.get( 'select' ).select( 'custom' );
	} );

	// Step 6: Click the image to show URL input
	dismissPopovers();
	if ( blockName.includes( 'collage' ) ) {
		cy.get( `[data-type="${ blockName }"] .wp-block-coblocks-gallery-collage__item` ).first().click();
		cy.get( `[data-type="${ blockName }"] img` ).first().click( { force: true } );
	} else {
		cy.get( `[data-type="${ blockName }"]` ).within( () => {
			cy.get( imageSelector ).first().click( { force: true } );
		} );
	}

	// Step 7: Find and use the URL input
	cy.get( '.block-editor-url-input input:visible' ).should( 'exist' ).clear().type( customUrl );
	cy.get( 'button[type="submit"]:visible' ).click();

	// Step 8: Verify
	cy.get( `[data-type="${ blockName }"]` ).within( () => {
		cy.get( imageSelector ).first()
			.should( 'have.attr', 'data-imglink' )
			.and( 'include', customUrl );
	} );
}

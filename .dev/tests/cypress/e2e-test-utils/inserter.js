/**
 * Opens the global block inserter.
 */
export function openGlobalBlockInserter() {
	cy.wrap( null ).then( () => isGlobalInserterOpen().then(
		( isOpen ) => ! isOpen && toggleGlobalBlockInserter()
	) );
	cy.get( '.block-editor-inserter__menu' ).should( 'exist' );
}

/**
 * Closes the global block inserter.
 */
export function closeGlobalBlockInserter() {
	cy.wrap( null ).then( () => isGlobalInserterOpen().then(
		( isOpen ) => isOpen && toggleGlobalBlockInserter()
	) );
	cy.get( '.block-editor-inserter__menu' ).should( 'not.exist' );
}

/**
 * Determine if the global block inserter is open.
 */
function isGlobalInserterOpen() {
	return new Cypress.Promise( ( resolve ) => {
		resolve( !! Cypress.$( '.edit-post-header [aria-label="Add block"].is-pressed, .edit-site-header [aria-label="Add block"].is-pressed' ).length );
	} );
}

/**
 * Toggle the global block inserter.
 */
function toggleGlobalBlockInserter() {
	cy.get( '.edit-post-header [aria-label="Add block"], .edit-site-header [aria-label="Add block"]' ).click();
}

/**
 * Search for block in the global inserter
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export function searchForBlock( searchTerm ) {
	cy.get( '.block-editor-inserter__search-input,input.block-editor-inserter__search' ).focus().type( searchTerm );
}

/**
 * Opens the inserter, searches for the given term, then selects the first
 * result that appears.
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
export function insertBlock( searchTerm ) {
	openGlobalBlockInserter();
	searchForBlock( searchTerm );
	cy.get( '.block-editor-block-types-list__list-item' ).first().click();

	// Make sure the block was added to our page
	cy.get( `.edit-post-visual-editor .wp-block[data-type="${ searchTerm }"], .edit-site-visual-editor .wp-block[data-type="${ searchTerm }"]` ).should( 'exist' );
}

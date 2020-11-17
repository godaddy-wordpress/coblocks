describe( 'Test CoBlocks Media Card Block', function() {
	/**
	 * Test that we can not insert a media-card block into the page.
	 * Media-card blocks is deprecated and should not be usable.
	 */
	it( 'Test media-card block in not insertable.', function() {
		cy.get( '.edit-post-header-toolbar' ).find( '.edit-post-header-toolbar__inserter-toggle' ).then( ( inserterButton ) => {
			if ( ! Cypress.$( inserterButton ).hasClass( 'is-pressed' ) ) {
				cy.get( inserterButton ).click();
			}
		} );

		cy.get( '.block-editor-inserter__search' ).find( 'input' ).clear();
		cy.get( '.block-editor-inserter__search' ).click().type( 'media-card' );

		cy.get( '.block-editor-inserter__block-list .editor-block-list-item-coblocks-media-card' ).should( 'not.exist' );
	} );
} );

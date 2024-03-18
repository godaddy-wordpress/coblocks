describe( 'Category for CoBlocks patterns', () => {
	beforeEach( () => {
		cy.visit( Cypress.env( 'testURL' ) + '/wp-admin/site-editor.php?path=%2Fpatterns&categoryType=pattern&categoryId=coblocks' );
	} );

	it( 'can be duplicated without errors', () => {
		cy.get( '[aria-label="Actions"]' ).first().click();

		cy.get( '[role="menuitem"]' ).contains( 'Duplicate' ).click( { force: true } );

		cy.get( '.components-modal__header-heading-container' ).contains( 'Duplicate pattern' );

		cy.get( '.components-button.is-primary ' ).contains( 'Duplicate' ).click();

		cy.get( '.components-snackbar__content' ).contains( 'duplicated' );
	} );
} );

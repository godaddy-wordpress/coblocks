describe( 'Component: CoBlocks Deactivate Modal', () => {
	beforeEach( () => {
		cy.visit( Cypress.env( 'testURL' ) + '/wp-admin/plugins.php' );

		cy.get( 'body' ).then( ( $body ) => {
			if ( $body.find( '#deactivate-coblocks' ).length === 0 ) {
				cy.get( '#activate-coblocks' ).click();
			}
		} );

		cy.get( '#deactivate-coblocks' ).should( 'exist' );
	} );

	afterEach( () => {
		cy.get( '#activate-coblocks' ).should( 'exist' );

		cy.get( '#activate-coblocks' ).click();
	} );

	it( 'open modal and submit feedback', function() {
		cy.intercept(
			'GET',
			'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout*',
			{ fixture: '../.dev/tests/cypress/fixtures/network/coblocks_optout.json' }
		);

		cy.wait( 2000 );

		cy.get( '#deactivate-coblocks' ).click();

		cy.get( '.components-checkbox-control__input' ).eq( 0 ).check();

		cy.get( '.components-checkbox-control__input' ).eq( 2 ).check();

		cy.get( '.components-text-control__input' ).eq( 0 ).type( 'need more widgets' );

		cy.intercept( 'POST', 'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout', {
			statusCode: 201,
		} );

		cy.get( '.components-button-group .is-primary' ).click();
	} );

	it( 'open modal and skip feedback', function() {
		cy.intercept(
			'GET',
			'https://wpnux.godaddy.com/v3/api/feedback/coblocks-optout*',
			{ fixture: '../.dev/tests/cypress/fixtures/network/coblocks_optout.json' }
		);

		cy.wait( 2000 );

		cy.get( '#deactivate-coblocks' ).click();

		cy.get( '.components-button-group .is-link' ).click();
	} );
} );

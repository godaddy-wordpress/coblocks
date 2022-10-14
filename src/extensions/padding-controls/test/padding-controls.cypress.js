/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Extension: CoBlocks Padding Controls', function() {
	/**
	 * Test that the CoBlocks panel padding controls function as expected.
	 */
	it( 'Can control padding settings as expected.', function() {
		// WP 6.1 : Group icon class in inserter has different structure than the other blocks
		if ( Cypress.$( '.branch-6-1' ).length > 0 ) {
			helpers.addNewGroupToPost();
		} else {
			helpers.addBlockToPost( 'core/group', true );
		}

		helpers.selectBlock( 'group' );

		helpers.openSettingsPanel( /group settings/i );

		cy.get( '.components-base-control' ).contains( /padding/i ).parent().find( `.components-button[aria-label="None"]` ).click();
		cy.get( '[data-type="core/group"]' ).should( 'have.class', `has-no-padding` );

		[ 'Small', 'Medium', 'Large', 'Huge', 'Custom' ].forEach( ( padding ) => {
			cy.get( '.components-base-control' ).contains( /padding/i ).parent().find( `.components-button[aria-label="${ padding }"]` ).click();
			cy.get( '[data-type="core/group"]' ).should( 'have.class', `has-${ padding.toLowerCase() }-padding` );
		} );

		// Test custom padding
		cy.get( '.components-base-control' ).contains( /padding/i ).closest( '.components-panel__body' ).find( 'input.components-input-control__input' ).focus().type( 5 ); // Panel body.

		// Firefox style is the same but does not calculate the same because of spacing.
		if ( Cypress.browser.name === 'firefox' ) {
			cy.get( '[data-type="core/group"]' ).should( 'have.attr', 'style', '--coblocks-custom-padding: 5em;' );
		}

		if ( Cypress.browser.name === 'chrome' ) {
			cy.get( '[data-type="core/group"]' ).should( 'have.attr', 'style', '--coblocks-custom-padding:5em;' );
		}

		helpers.checkForBlockErrors( 'core/group' );
	} );
} );

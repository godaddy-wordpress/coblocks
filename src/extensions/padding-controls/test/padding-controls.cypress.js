/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Extension: CoBlocks Padding Controls', function() {
	/**
	 * Test that the CoBlocks panel padding controls function as expected.
	 */
	it( 'Can control padding settings as expected.', function() {
		helpers.addNewGroupToPost();

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

		cy.get( '[data-type="core/group"]' ).should( 'have.attr', 'style', '--coblocks-custom-padding: 5em;' );

		helpers.checkForBlockErrors( 'core/group' );
	} );
} );

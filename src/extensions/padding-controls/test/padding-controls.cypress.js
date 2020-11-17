/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Extension: CoBlocks Padding Controls', function() {
	/**
	 * Test that the CoBlocks panel padding controls function as expected.
	 */
	it( 'Can control padding settings as expected.', function() {
		helpers.addBlockToPost( 'core/group', true );
		cy.get( '[data-type="core/group"]' ).click( { force: true } );

		helpers.openSettingsPanel( /group settings/i );

		cy.get( '.components-base-control' ).contains( /padding/i ).parent().find( `.components-button[aria-label="None"]` ).click();

		[ 'Small', 'Medium', 'Large', 'Huge' ].forEach( ( padding ) => {
			cy.get( '.components-base-control' ).contains( /padding/i ).parent().find( `.components-button[aria-label="${ padding }"]` ).click();
			cy.get( '[data-type="core/group"]' ).should( 'have.class', `has-${ padding.toLowerCase() }-padding` );
		} );

		helpers.checkForBlockErrors( 'core/group' );
	} );
} );

/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks OpenTable Block', function() {
	it( 'Test Reviews block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/reviews', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/reviews' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-reviews' ).should( 'not.exist' );

		helpers.editPage();
	} );

	it( 'Test Reviews block searches for business and returns results.', function() {
		helpers.addBlockToPost( 'coblocks/reviews', true );

		cy.get( '.wp-block-coblocks-reviews .components-text-control__input' ).first().type( 'durbar square restaurant' );

        cy.get( '.wp-block-coblocks-reviews .components-text-control__input' ).last().type( 'portsmouth, nh' );

		cy.get( '.search_button button' ).click();

        cy.contains( 'Durbar Square Restaurant' );
	} );
} );

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

	it( 'Test Reviews block loads reviews for selected business', function() {
		helpers.addBlockToPost( 'coblocks/reviews', true );

		cy.get( '.wp-block-coblocks-reviews .components-text-control__input' ).first().type( 'durbar square restaurant' );

		cy.get( '.wp-block-coblocks-reviews .components-text-control__input' ).last().type( 'portsmouth, nh' );

		cy.get( '.search_button button' ).click();

		cy.get( '.components-business-selector__business_item .information_box .components-button' ).click();

		// checks for number of reviews >= 2.
		cy.get( '.component-loaded-reviews' ).find( 'div' ).its( 'length' ).should( 'be.gte', 2 );
	} );

	it( 'Test Reviews block selects reviews for selected business and saves', function() {
		helpers.addBlockToPost( 'coblocks/reviews', true );

		cy.get( '.wp-block-coblocks-reviews .components-text-control__input' ).first().type( 'durbar square restaurant' );

		cy.get( '.wp-block-coblocks-reviews .components-text-control__input' ).last().type( 'portsmouth, nh' );

		cy.get( '.search_button button' ).click();

		cy.get( '.components-business-selector__business_item .information_box .components-button' ).click();

		cy.get( '.component-loaded-reviews .review-selector-checkbox' ).first().check();

		cy.get( '.wp-block-coblocks-reviews .save-reviews-action' ).click();

		cy.get( '.wp-block-coblocks-reviews .block-editor-inner-blocks .block-editor-block-list__layout' ).find( 'div' ).its( 'length' ).should( 'be.gte', 1 );
	} );
} );

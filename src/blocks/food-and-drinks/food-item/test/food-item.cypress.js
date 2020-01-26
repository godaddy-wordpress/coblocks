/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';
import 'cypress-file-upload';

describe( 'Test CoBlocks Food Item Block', function() {
	/**
	   * Test that we can add a food-item block to the content, not alter
	   * any settings, and are able to successfully save the block without errors.
	   */
	it( 'Test food-item block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'food-and-drinks' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'food-item' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-food-item' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	   * Test that we can add a food-and-drinks block to the content,
	   * and can save with food item attributes enabled.
	   */
	it( 'Test food-item block saves with food item attributes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'food-and-drinks' );

		cy.get( '.wp-block-coblocks-food-item' ).first().click( { force: true } );

		cy.get( '.components-food-item-attributes' ).find( 'input[type="checkbox"]' ).each( $checkBox => {
			cy.get( $checkBox ).click();
		} );

		cy.get( '.wp-block-coblocks-food-item' ).first().find( '.wp-block-coblocks-food-item__heading > h4' ).click( { force: true } ).type( 'Title' );

		cy.get( 'button.wp-block-coblocks-food-item__attribute' ).should( 'have.length', 7 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'food-item' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-food-item__attribute' ).should( 'have.length', 7 );

		helpers.editPage();
	} );
} );

/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Block: Highlight', function() {
	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/highlight', true );
	} );

	/**
	 * Test that we can add a highlight block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'can be inserted without errors', function() {
		cy.get( '.wp-block-coblocks-highlight' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/highlight' );
	} );

	/**
	 * Test that we can add a highlight block to the page, add text to it,
	 * save and it displays properly without errors.
	 */
	it( 'can have content', function() {
		cy.get( '.wp-block-coblocks-highlight' ).find( 'mark' ).click().type( 'highlighted text' );
		helpers.checkForBlockErrors( 'coblocks/highlight' );
	} );

	/**
	 * Test the highlight block custom classes
	 */
	it( 'Test the highlight block custom classes.', function() {
		// Workaround for the advanced panel not loading consistently.
		cy.get( '.editor-post-title' ).click();

		helpers.addCustomBlockClass( 'my-custom-class', 'highlight' );
		cy.get( '.wp-block-coblocks-highlight' ).should( 'have.class', 'my-custom-class' );

		helpers.checkForBlockErrors( 'coblocks/highlight' );
	} );

	/**
	 * Test the highlight block custom classes
	 */
	it( 'Test the Font size changes as expected.', function() {
		cy.get( '.components-toggle-group-control-option, .components-toggle-group-control-option-base' ).then( ( elems ) => {
			let dataValue = Cypress.$( '.wp-block-coblocks-highlight' ).css( 'font-size' );
			Array.from( elems ).forEach( ( elem ) => {
				cy.get( elem ).focus().click().then( () => {
					// We do not test the value due to theme setting specified font sizes.
					// Instead we test that the value has changed from previous value.
					cy.get( '.wp-block-coblocks-highlight' ).should( 'not.to.have.css', 'font-size', dataValue );
					dataValue = Cypress.$( '.wp-block-coblocks-highlight' ).css( 'font-size' );
				} );
			} );
		} );
	} );
} );

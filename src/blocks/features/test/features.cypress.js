/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Features Block', function() {
	before( function() {
		helpers.addCoBlocksBlockToPage( true, 'features' );
	} );

	afterEach( function() {
		helpers.checkForBlockErrors( 'features' );
	} );

	/**
	 * Test that we can add a features block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test features block saves with empty values.', function() {
		cy.get( '.wp-block-coblocks-features' ).should( 'exist' );
	} );

	/**
	 * Test that we can add a features block to the content, change
	 * column count and  are able to successfully save the block without errors.
	 */
	it( 'Test features block allows up to four feature columns.', function() {
		cy.get( '.wp-block-coblocks-features' ).click( { force: true } );
		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 2 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"]' ).click( { force: true } ).clear().type( 1 );
		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 1 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"]' ).click( { force: true } ).clear().type( 3 );
		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 3 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"]' ).click( { force: true } ).clear().type( 4 );
		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 4 );
	} );

	/**
	 * Test that we can add a features block to the content, add text
	 * adjust colors and are able to successfully save the block without errors.
	 */
	it( 'Test features block saves with content values set.', function() {
		cy.get( '.wp-block-coblocks-features' ).click( { force: true } ).click( { force: true } );

		helpers.setColorSetting( 'background color', '#ff0000' );
		helpers.setColorSetting( 'text color', '#ffffff' );

		cy.get( '.wp-block-coblocks-features' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-features__inner' )
			.should( 'have.css', 'background-color', 'rgb(255, 0, 0)' )
			.should( 'have.css', 'color', 'rgb(255, 255, 255)' );
	} );

	/**
	 * Test the features block saves with custom classes
	 */
	it( 'Test the features block custom classes.', function() {
		helpers.addCustomBlockClass( 'my-custom-class', 'features' );

		cy.get( '.wp-block-coblocks-features' )
			.should( 'have.class', 'my-custom-class' );
	} );

	it( 'Updates the inner core/heading blocks when the "Heading Level" control is changed.', function() {
		helpers.openSettingsPanel( /features settings/i );

		const numberOfHeadings = Cypress.$( '[data-type="coblocks/feature"] [data-type="core/heading"]' ).length;

		cy.get( '.components-coblocks-heading-toolbar [aria-label="Heading 6"]' ).click( { force: true } );
		cy.get( '[data-type="coblocks/feature"] [data-type="core/heading"] h6' ).should( 'have.length', numberOfHeadings );
	} );
} );

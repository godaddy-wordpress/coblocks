/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Features Block', function() {
	/**
	 * Setup Features data
	 */
	const featuresData = {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	 * Test that we can add a features block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test features block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/features', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/features' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-features' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a features block to the content, change
	 * column count and  are able to successfully save the block without errors.
	 */
	it( 'Test features block allows up to four feature columns.', function() {
		helpers.addBlockToPost( 'coblocks/features', true );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 2 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"][type="number"]' ).focus().type( '{selectall}' ).type( 1 );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 2 ); // Children should never decrease with column count

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"][type="number"]' ).focus().type( '{selectall}' ).type( 3 );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 3 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"][type="number"]' ).focus().type( '{selectall}' ).type( 4 );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 4 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/features' );
	} );

	/**
	 * Test that we can add a features block to the content, add text
	 * adjust colors and are able to successfully save the block without errors.
	 */
	it( 'Test features block saves with content values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB } = featuresData;
		helpers.addBlockToPost( 'coblocks/features', true );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } ).click( { force: true } );

		helpers.setColorSettingsFoldableSetting( 'background color', backgroundColor );
		helpers.setColorSettingsFoldableSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/features' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-features' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-features__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );

	/**
	 * Test the features block saves with custom classes
	 */
	it( 'Test the features block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/features', true );

		helpers.addCustomBlockClass( 'my-custom-class', 'features' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/features' );

		cy.get( '.wp-block-coblocks-features' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-features' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );

	it( 'Updates the inner core/heading blocks when the "Heading Level" control is changed.', function() {
		helpers.addBlockToPost( 'coblocks/features', true );
		cy.get( '.wp-block-coblocks-feature h4' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } );
		helpers.openHeadingToolbarAndSelect( 2 );
		cy.get( '.wp-block-coblocks-feature h2' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } );
		helpers.openHeadingToolbarAndSelect( 3 );
		cy.get( '.wp-block-coblocks-feature h3' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } );
		helpers.openHeadingToolbarAndSelect( 4 );
		cy.get( '.wp-block-coblocks-feature h4' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } );
		helpers.openHeadingToolbarAndSelect( 5 );
		cy.get( '.wp-block-coblocks-feature h5' ).should( 'exist' );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/features' );
	} );
} );

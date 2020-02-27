/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';
import 'cypress-file-upload';

describe( 'Test CoBlocks Food and Drinks Block', function() {
	/**
	 * Setup food-and-drinks data
	 */
	const foodData = {
		price: 33.33,
		image: {
			fileName: '150x150.png',
			imageBase: '150x150',
			pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
			caption: 'Caption Here',
		},
	};

	/**
	 * Test that we can add a food-and-drinks block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test food-and-drinks block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'food-and-drinks' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'food-and-drinks' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-food-and-drinks' ).children().should( 'have.length', 1 );
		cy.get( '.wp-block-coblocks-food-and-drinks > h3' ).should( 'be.empty' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a food-and-drinks block to the content,
	 * and can trigger images attribute on items
	 */
	it( 'Test food-and-drinks block saves with image attribute.', function() {
		const { fileName, imageBase, pathToFixtures } = foodData.image;

		helpers.addCoBlocksBlockToPage( true, 'food-and-drinks' );

		helpers.toggleSettingCheckbox( /images/i );

		cy.get( '.wp-block-coblocks-food-item' ).contains( /media library/i ).should( 'exist' );

		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().click( 'bottom' );

		cy.fixture( pathToFixtures + fileName, 'base64' ).then( ( fileContent ) => {
			cy.get( 'div[data-type="coblocks/food-item"]' ).not( 'div[role="toolbar"]' ).first()
				.find( 'div.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				)
				.wait( 2000 ); // Allow upload to finish.

			cy.get( 'div[data-type="coblocks/food-item"]' ).not( 'div[role="toolbar"]' ).first()
				.find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'food-and-drinks' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-food-item' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-food-item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

		helpers.editPage();
	} );

	/**
	 * Test the food-and-drinks block saves with custom classes
	 */
	it( 'Test the food-and-drinks block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'food-and-drinks' );

		helpers.addCustomBlockClass( 'my-custom-class', 'food-and-drinks' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'food-and-drinks' );

		cy.get( '.wp-block-coblocks-food-and-drinks' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-food-and-drinks' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );

	/**
	 * Test the food-and-drinks block saves heading levels set
	 */
	it( 'Updates the inner blocks when the "Heading Level" control is changed.', function() {
		helpers.addCoBlocksBlockToPage( true, 'food-and-drinks' );

		cy.get( '.block-editor-block-toolbar [aria-label="Change heading level"]' ).click( { force: true } );
		cy.get( 'div[aria-label="Change heading level"][role="menu"] button' ).contains( 'Heading 2' ).click( { force: true } );
		cy.get( '[data-type="coblocks/food-and-drinks"] [data-type="coblocks/food-item"] h2' ).should( 'have.length', 2 );

		helpers.savePage();
		helpers.checkForBlockErrors( 'food-and-drinks' );
	} );
} );

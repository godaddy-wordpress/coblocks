/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Author Block', function() {
	/**
	 * Setup author image data
	 */
	const authorImageData = {
		fileName: '150x150.png',
		imageBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
	};

	/**
	 * Test that we can add a author block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test author block saves with empty values.', function() {
		helpers.addBlockToPost( 'coblocks/author', true );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/author' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-author' )
			.should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a custom class to the author block
	 */
	it( 'Test author block custom class.', function() {
		helpers.addBlockToPost( 'coblocks/author', true );

		cy.get( '.wp-block-coblocks-author' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-author__name' ).type( 'Randall Lewis' );

		helpers.addCustomBlockClass( 'my-custom-class', 'author' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/author' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-author' )
			.should( 'exist' )
			.and( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a author block with author info content
	 */
	it( 'Test author block saves with author information.', function() {
		const { fileName, imageBase, pathToFixtures } = authorImageData;
		helpers.addBlockToPost( 'coblocks/author', true );

		cy.get( '.wp-block-coblocks-author' ).click( { force: true } );

		// Upload the author avatar
		cy.fixture( pathToFixtures + fileName, 'base64' ).then( ( fileContent ) => {
			cy.get( 'div[data-type="coblocks/author"]' )
				.find( 'div.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				);
			cy.get( '.wp-block-coblocks-author__avatar img' ).should( 'exist' ); // Wait for upload to finish.
		} );

		cy.get( '.wp-block-coblocks-author__name' ).type( 'Randall Lewis' );

		cy.get( '.wp-block-coblocks-author__biography' ).type( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' );

		cy.get( '.wp-block-coblocks-author .wp-block-button__link' ).type( 'Read My Bio' );

		cy.get( '.wp-block-coblocks-author' ).then( ( author ) => {
			if ( ! author.prop( 'outerHTML' ).includes( 'editor-url-input' ) ) { // wp 5.4
				cy.get( author ).find( '.wp-block-button__link' ).click();
				cy.get( '.block-editor-block-toolbar' )
					.find( 'button.components-button[aria-label="Link"]' )
					.click();
				cy.get( 'input[aria-label="URL"]' ).type( 'https://www.google.com{enter}', );
			} else { // pre wp 5.4
				cy.get( author ).find( 'input[aria-label="URL"]' ).type( 'https://www.google.com' );
			}
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/author' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-author' )
			.should( 'exist' );

		cy.get( '.wp-block-coblocks-author__avatar-img' )
			.should( 'have.attr', 'src' )
			.and( 'contains', imageBase );

		cy.get( '.wp-block-coblocks-author__name' )
			.contains( 'Randall Lewis' );

		cy.get( '.wp-block-coblocks-author__biography' )
			.contains( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' );

		cy.get( '.wp-block-button__link' )
			.contains( 'Read My Bio' )
			.and( 'have.attr', 'href', 'https://www.google.com' );

		helpers.editPage();
	} );
} );

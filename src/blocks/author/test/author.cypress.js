/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';
import { testURL } from '../../../../.dev/tests/cypress/constants';

describe( 'Test CoBlocks Author Block', function() {
	const fileName = '../dist/images/map/dark.jpg';

	before( function() {
		cy.visit( testURL + '/wp-admin/upload.php' );
		cy.get( 'html' ).then( ( $html ) => {
			if ( $html.find( '.mode-grid' ).length ) {
				cy.get( 'a.view-list' ).click();
				cy.get( '.wp-list-table' );
			}
		} );
		cy.visit( testURL + '/wp-admin/media-new.php' );
		cy.get( 'html' ).then( ( $html ) => {
			if ( $html.find( '.upload-flash-bypass' ).is( ':visible' ) ) {
				cy.get( '.upload-flash-bypass' ).click();
			}
		} );
		cy.fixture( fileName ).then( fileContent => {
			cy.get( 'input[id="async-upload"]' ).upload( { fileContent, fileName, mimeType: 'application/json' } );
			cy.get( '#html-upload' ).click();
			cy.get( '.has-media-icon' ).contains( 'dark' );
		} );
		helpers.createNewPost();
		helpers.disableGutenbergFeatures();
	} );

	/**
	 * Test that we can add a author block to the content, not add any text or
	 * alter any settings, and are able to successfuly save the block without errors.
	 */
	it( 'Test author block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage();

		helpers.savePage();

		helpers.checkForBlockErrors();

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-author' )
			.should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a custom class to the author block
	 */
	it( 'Test author block custom class.', function() {
		helpers.addCoBlocksBlockToPage();

		cy.get( '.wp-block-coblocks-author' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-author__name' ).type( 'Randall Lewis' );

		helpers.addCustomBlockClass( 'my-custom-class', 'author' );

		helpers.savePage();

		helpers.checkForBlockErrors();

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
		helpers.addCoBlocksBlockToPage();

		cy.get( '.wp-block-coblocks-author' ).click( { force: true } );

		// Upload the author avatar
		cy.get( '.wp-block-coblocks-author__avatar' ).click();
		cy.get( '.media-frame-router .media-router #menu-item-browse' ).click();
		cy.get( '.attachments li:first-child' ).click();
		cy.get( '.media-frame-toolbar .media-button-select' ).click();
		cy.get( '.wp-block-coblocks-author__avatar-img' ).should( 'have.attr', 'src' ).and( 'match', /dark/ );

		cy.get( '.wp-block-coblocks-author__name' ).type( 'Randall Lewis' );

		cy.get( '.wp-block-coblocks-author__biography' ).type( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' );

		cy.get( '.wp-block-coblocks-author .wp-block-button__link' ).type( 'Read My Bio' );

		cy.get( '.wp-block-coblocks-author input[aria-label="URL"]' ).type( 'https://www.google.com' );

		helpers.savePage();

		helpers.checkForBlockErrors();

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-author' )
			.should( 'exist' );

		cy.get( '.wp-block-coblocks-author__avatar-img' )
			.should( 'have.attr', 'src' )
			.and( 'match', /dark/ );

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

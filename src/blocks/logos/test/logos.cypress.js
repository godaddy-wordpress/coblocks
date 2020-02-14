/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Logos Block', function () {
	/**
	 * Setup Logos data
	 */
	const logosData = {
		fileName: '150x150.png',
		imageBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
	};

	const selectFromMediaLibrary = () => {
		cy.get( '@targetElement' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).within( $mediaModal => {
			// 1. Select Media Library tab.
			$mediaModal.find( '#menu-item-browse' ).click();
			// 2. Select first item in Media Library list.
			cy.get( '.attachments .attachment.save-ready' ).first().click();
			// 3. Click "Create New Gallery" or "Add to Gallery" button.
			cy.get( '.media-toolbar-primary .media-button.button-primary' ).click();
			// 4. Click "Insert Gallery" or "Update Gallery" button.
			cy.get( '.media-toolbar-primary .media-button.button-primary' ).click();
		} );
	};

	before( () => {
		helpers.addCoBlocksBlockToPage( true, 'logos' );
	} );

	beforeEach( () => {
		cy.get( '.wp-block[data-type="coblocks/logos"]' ).first().as( 'targetElement' );
	} );

	/**
	 * Test that we can add a logos block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test logos block saves with empty values.', function () {
		cy.get( '.wp-block-coblocks-logos' ).should( 'exist' );
		helpers.checkForBlockErrors( 'logos' );
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test logos block saves with image upload.', function () {
		const { fileName, imageBase, pathToFixtures } = logosData;

		cy.get('@targetElement').click();

		cy.fixture( pathToFixtures + fileName, 'base64' ).then( async fileContent => {
			await cy.get('@targetElement').find( '.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				);
			cy.get('@targetElement').find( '.wp-block-coblocks-logos img' )
				.should( 'have.attr', 'src' )
				.should( 'include', imageBase );
		} );

		helpers.checkForBlockErrors( 'logos' );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test logos block saves with image from media library.', function () {
		selectFromMediaLibrary();

		helpers.checkForBlockErrors( 'logos' );

		cy.get( '@targetElement' ).find( '.wp-block-coblocks-logos' ).should( 'exist' );
		cy.get( '@targetElement' ).find( '.wp-block-coblocks-logos img' ).should( 'have.attr', 'src' );
	} );

	/**
	 * Test that we can add "black and white" image filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with black and white filter.', function () {
		helpers.setBlockStyle( /black & white/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-black-and-white' );
		helpers.checkForBlockErrors( 'logos' );
	} );

	/**
	 * Test that we can add image "grayscale" filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with grayscale filter.', function () {
		helpers.setBlockStyle( /grayscale/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-grayscale' );
		helpers.checkForBlockErrors( 'logos' );
	} );

	/**
	 * Test that we can add image "default" filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with default filter.', function () {
		helpers.setBlockStyle( /default/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-default' );
		helpers.checkForBlockErrors( 'logos' );
	} );
} );

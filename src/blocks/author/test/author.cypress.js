/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Author Block', function() {
	before( () => {
		helpers.loginToSite().then( () => {
			if ( helpers.isNotWPLocalEnv() ) {
				cy.wait( 10000 );
			}

			helpers.disableGutenbergFeatures();
		} );
	} );

	beforeEach( () => {
		if ( wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' ) ) {
			wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );
		}
	} );

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

		helpers.selectBlock( 'author' );

		cy.get( '.wp-block-coblocks-author__name' ).focus().type( 'Randall Lewis' );

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
		const { fileName, pathToFixtures, imageBase } = helpers.upload.spec;

		helpers.addBlockToPost( 'coblocks/author', true );

		helpers.selectBlock( 'author' );

		// Upload the Author avatar
		cy.fixture( pathToFixtures + fileName, { encoding: null } ).then( ( fileContent ) => {
			cy.get( 'div[data-type="coblocks/author"] .wp-block-coblocks-author__avatar' ).click();
			cy.get( '[class^="moxie"] [type="file"]' ).selectFile( { action: 'drag-drop', contents: fileContent, fileName: pathToFixtures + fileName, mimeType: 'image/png' }, { force: true } );

			cy.get( '.attachment.selected.save-ready' );

			cy.get( '.media-modal .media-button-select' ).click();

			cy.get( '[class*="-visual-editor"]' ).find( `[data-type="coblocks/author"] img` ).first().should( 'have.attr', 'src' ).should( 'include', imageBase );
		} );

		cy.get( '.wp-block-coblocks-author__name' ).focus().type( 'Randall Lewis' ).blur();

		cy.get( '.wp-block-coblocks-author__biography' ).focus().type( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' ).blur();

		cy.get( '.wp-block-coblocks-author .wp-block-button__link' ).focus().type( 'Read My Bio' ).blur();

		cy.get( '.wp-block-coblocks-author' ).then( ( author ) => {
			if ( ! author.prop( 'outerHTML' ).includes( 'editor-url-input' ) ) { // wp 5.4
				cy.get( author ).find( '.wp-block-button__link' ).click();
				cy.get( '.block-editor-block-toolbar' )
					.find( 'button.components-button[aria-label="Link"]' )
					.click();
				cy.get( 'input[aria-label="URL"]' ).focus().type( 'https://www.google.com{enter}', );
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

	/**
	 * Test the text sizes change as expected
	 */
	it( 'Test the text sizes change as expected.', function() {
		helpers.addBlockToPost( 'coblocks/author', true );

		helpers.selectBlock( 'author' );

		cy.get( '.wp-block-coblocks-author__name' ).focus().type( 'Randall Lewis' );

		cy.get( '.components-toggle-group-control-option, .components-toggle-group-control-option-base' ).then( ( elems ) => {
			let dataValue = Cypress.$( '.wp-block-coblocks-author__name' ).css( 'font-size' );
			Array.from( elems ).forEach( ( elem ) => {
				cy.get( elem ).focus().click().then( () => {
					// We do not test the value due to theme setting specified font sizes.
					// Instead we test that the value has changed from previous value.
					cy.get( '.wp-block-coblocks-author__name' ).should( 'not.to.have.css', 'font-size', dataValue );
					dataValue = Cypress.$( '.wp-block-coblocks-author__name' ).css( 'font-size' );
				} );
			} );
		} );
	} );
} );

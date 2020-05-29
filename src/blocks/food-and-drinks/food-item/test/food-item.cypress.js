/**
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';
import 'cypress-file-upload';

describe( 'Block: Food Item', () => {

	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/food-and-drinks', true );
	} );

	it( 'can be inserted without errors', () => {
		cy.get( '.wp-block-coblocks-food-item' ).should( 'exist' );
		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'removes .is-empty when the \'title\', \'description\', \'price\' attributes have content', () => {
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().click().within( () => {

			// Set heading.
			cy.get( '.wp-block-coblocks-food-item__heading .block-editor-rich-text__editable' ).type( 'item heading' );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'not.have.class', 'is-empty' );
			cy.get( '.wp-block-coblocks-food-item__heading .block-editor-rich-text__editable' ).type( '{selectall}{del}' );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'have.class', 'is-empty' );

			// Set price.
			cy.get( '.wp-block-coblocks-food-item__price .block-editor-rich-text__editable' ).type( 'item price' );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'not.have.class', 'is-empty' );
			cy.get( '.wp-block-coblocks-food-item__price .block-editor-rich-text__editable' ).type( '{selectall}{del}' );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'have.class', 'is-empty' );

			// Set description.
			cy.get( '.wp-block-coblocks-food-item__description .block-editor-rich-text__editable' ).type( 'item description' );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'not.have.class', 'is-empty' );
			cy.get( '.wp-block-coblocks-food-item__description .block-editor-rich-text__editable' ).type( '{selectall}{del}' );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'have.class', 'is-empty' );
		} );
	} );

	it( 'can toggle image', () => {
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().click();
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'not.exist' );

		helpers.openSettingsPanel( /item settings/i );

		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /image/i ).click();
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'exist' );

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'can toggle price', () => {
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().click();
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( '.wp-block-coblocks-food-item__price' ).should( 'exist' );

		helpers.openSettingsPanel( /item settings/i );

		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /price/i ).click();
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( '.wp-block-coblocks-food-item__price' ).should( 'not.exist' );

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'can toggle attributes', () => {
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().click();
		helpers.openSettingsPanel( /item settings/i );

		Object.entries( {
			popular: /popular/i,
			'gluten-free': /gluten free/i,
			pescatarian: /pescatarian/i,
			spicy: /spicy/i,
			spicier: /spicier/i,
			vegan: /vegan/i,
			vegetarian: /vegetarian/i,
		} ).forEach( ( [ className, controlLabel ] ) => {
			cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( `.wp-block-coblocks-food-item__attribute--${className}` ).should( 'not.exist' );
			cy.get( '.components-base-control__field' ).contains( controlLabel ).click();
			cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( `.wp-block-coblocks-food-item__attribute--${className}` ).should( 'exist' );
		} );

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'can upload image with drag-and-drop', () => {
		// Open block settings panel.
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().click();
		helpers.openSettingsPanel( /item settings/i );

		// Enable the image on the block.
		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /image/i ).click();
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'exist' );

		// Drag-and-drop a file to upload.
		cy.fixture( '../.dev/tests/cypress/fixtures/images/150x150.png', 'base64' ).then( fileContent => {
			cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first()
				.find( '.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName: '150x150.png', mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				);
		} );

		// Assert that the image was added.
		cy.get( '.wp-block[data-type="coblocks/food-item"]' ).first().find( 'figure' ).find( 'img' )
			.should( 'have.attr', 'src' )
			.should( 'include', '150x150' );

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );
} );

/**
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Block: Food Item', () => {
	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/food-and-drinks', true );
	} );

	it( 'can be inserted without errors', () => {
		cy.get( '.wp-block-coblocks-food-item' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'removes .is-empty when the \'title\', \'description\', \'price\' attributes have content', () => {
		cy.get( '[data-type="coblocks/food-item"]' ).first().within( () => {
		// Set heading.
			cy.get( '.wp-block-coblocks-food-item__heading-wrapper .block-editor-rich-text__editable' ).focus().type( 'item heading', { force: true } );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'not.have.class', 'is-empty' );
			cy.get( '.wp-block-coblocks-food-item__heading-wrapper .block-editor-rich-text__editable' ).focus().type( '{selectall}{del}', { force: true } );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'have.class', 'is-empty' );

			// Set price.
			cy.get( '[aria-label="$0.00"]' ).focus().type( 'item price', { force: true } );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'not.have.class', 'is-empty' );
			cy.get( '[aria-label="$0.00"]' ).focus().type( '{selectall}{del}', { force: true } );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'have.class', 'is-empty' );

			// Set description.
			cy.get( '[aria-label="Add description…"]' ).focus().type( 'item description', { force: true } );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'not.have.class', 'is-empty' );
			cy.get( '[aria-label="Add description…"]' ).focus().type( '{selectall}{del}', { force: true } );
			cy.get( '.wp-block-coblocks-food-item' ).should( 'have.class', 'is-empty' );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'can toggle image', () => {
		cy.get( '[data-type="coblocks/food-item"]' ).first().click();
		cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'not.exist' );

		helpers.openSettingsPanel( /item settings/i );

		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /image/i ).click();
		cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'can toggle price', () => {
		cy.get( '[data-type="coblocks/food-item"]' ).first().click();
		cy.get( '[data-type="coblocks/food-item"]' ).first().find( '[aria-label="$0.00"]' ).should( 'exist' );

		helpers.openSettingsPanel( /item settings/i );

		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /price/i ).click();
		cy.get( '[data-type="coblocks/food-item"]' ).first().find( '[aria-label="$0.00"]' ).should( 'not.exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'can toggle attributes', () => {
		cy.get( '[data-type="coblocks/food-item"]' ).first().click();
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
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( `.wp-block-coblocks-food-item__attribute--${ className }` ).should( 'not.exist' );
			cy.get( '.components-base-control__field' ).contains( controlLabel ).click();
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( `.wp-block-coblocks-food-item__attribute--${ className }` ).should( 'exist' );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );

	it( 'can upload image with drag-and-drop', () => {
		const { imageBase } = helpers.upload.spec;
		// Open block settings panel.
		cy.get( '[data-type="coblocks/food-item"]' ).first().click();
		helpers.openSettingsPanel( /item settings/i );

		// Enable the image on the block.
		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /image/i ).click();
		cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'exist' );

		// Drag-and-drop a file to upload.
		helpers.upload.imageToBlock( 'coblocks/food-item' );

		// Assert that the image was added.
		cy.get( '[data-type="coblocks/food-item"] img[src*="http"]' )
			.should( 'have.attr', 'src' )
			.should( 'include', imageBase );

		helpers.checkForBlockErrors( 'coblocks/food-item' );
	} );
} );

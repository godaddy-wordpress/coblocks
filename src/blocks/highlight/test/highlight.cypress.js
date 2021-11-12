/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Block: Highlight', function() {
	/**
	 * Setup accordion data to be used
	 */
	const highlightData = {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/highlight', true );
	} );

	/**
	 * Test that we can add a highlight block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'can be inserted without errors', function() {
		cy.get( '.wp-block-coblocks-highlight' ).should( 'exist' );
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
	 * Test the accordion block content font settings
	 */
	it( 'Test highlight block font size setting.', function() {
		cy.get( 'p.wp-block-coblocks-highlight' ).find( 'mark' )
			.type( 'highlighted text' );

		cy.get( '.edit-post-sidebar' )
			.contains( RegExp( 'Highlight settings', 'i' ) )
			.then( ( $settingSection ) => {
				// >= WP 5.9
				if ( Cypress.$( '[aria-label="Set custom size"]' ).length > 0 ) {
					cy.get( '[aria-label="Set custom size"]' )
						.click();
					cy.get( '.components-input-control__input' ).focus().type( '30' );
				// < WP 5.9
				} else if ( Cypress.$( '.components-select-control__input' ).length > 0 ) {
					cy.get( Cypress.$( $settingSection ).closest( '.components-panel__body' ) )
						.find( '.components-select-control__input' )
						.select( 'large' );
				} else {
					cy.get( Cypress.$( $settingSection ).closest( '.components-panel__body' ) )
						.find( 'input[type="number"]' ).focus().type( '30' );
				}
			} );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content[style*="font-size: 30px;"]' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/highlight' );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content[style*="font-size: 30px;"]' );
	} );

	/**
	 * Test the highlight block color settings
	 */
	it( 'Test highlight block color settings.', function() {
		cy.get( 'p.wp-block-coblocks-highlight' ).find( 'mark' )
			.type( 'highlighted text' );

		helpers.setColorSetting( 'background', highlightData.backgroundColor );
		helpers.setColorSetting( 'text', highlightData.textColor );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.class', 'has-background' );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.css', 'background-color', highlightData.backgroundColorRGB );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.class', 'has-text-color' );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.css', 'color', highlightData.textColorRGB );

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
} );

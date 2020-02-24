/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Highlight Block', function() {
	/**
   * Setup accordion data to be used
   */
	const highlightData = [
		{
			text: 'We are closed today from 2PM to 4PM.',
			backgroundColor: '#ff0000',
			textColor: '#ffffff',
			backgroundColorRGB: 'rgb(255, 0, 0)',
			textColorRGB: 'rgb(255, 255, 255)',
		},
		{
			text: 'Due to Server Maintenance, the Server will be down for a few hours.',
			backgroundColor: '#cce5ff',
			textColor: '#004085',
			backgroundColorRGB: 'rgb(204, 229, 255)',
			textColorRGB: 'rgb(0, 64, 133)',
		},
	];

	/**
	 * Test that we can add a highlight block to the content, not add any text or
	 * alter any settings, and are able to successfuly save the block without errors.
	 */
	it( 'Test highlight block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'highlight' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'highlight' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-highlight' )
			.should( 'have.length', 0 );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a hightlight block to the page, add text to it,
	 * save and it displays properly without errors.
	 */
	it( 'Test highlight block saves and displays correctly.', function() {
		helpers.addCoBlocksBlockToPage( true, 'highlight' );

		cy.get( 'p.wp-block-coblocks-highlight' ).find('mark')
			.type( highlightData[ 0 ].text );

		helpers.savePage();

		helpers.checkForBlockErrors( 'highlight' );

		helpers.viewPage();

		cy.get( 'p.wp-block-coblocks-highlight' )
			.contains( highlightData[ 0 ].text );

		helpers.editPage();
	} );

	/**
	 * Test the accordion block content font settings
	 */
	it( 'Test highlight block font size setting.', function() {
		helpers.addCoBlocksBlockToPage( true, 'highlight' );

		cy.get( 'p.wp-block-coblocks-highlight' ).find('mark')
			.type( highlightData[ 0 ].text );

		cy.get( '.edit-post-sidebar' )
			.contains( /default|regular/i )
			.parent()
			.then( ( $parentElm ) => {
				if ( $parentElm[ 0 ].type === 'select-one' ) {
					cy.get( $parentElm[ 0 ] )
						.select( 'large' );
				} else {
					cy.get( $parentElm[ 0 ] )
						.click()
						.parent()
						.contains( /large/i )
						.click();
				}
			} );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.class', 'has-large-font-size' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'highlight' );

		helpers.viewPage();

		cy.get( 'p.wp-block-coblocks-highlight' )
			.contains( highlightData[ 0 ].text );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.class', 'has-large-font-size' );

		helpers.editPage();
	} );

	/**
	 * Test the highlight block color settings
	 */
	it( 'Test highlight block color settings.', function() {
		helpers.addCoBlocksBlockToPage( true, 'highlight' );

		cy.get( 'p.wp-block-coblocks-highlight' ).find('mark')
			.type( highlightData[ 0 ].text );

		helpers.setColorSetting( 'background', highlightData[ 0 ].backgroundColor );
		helpers.setColorSetting( 'text', highlightData[ 0 ].textColor );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.class', 'has-background' );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.css', 'background-color', highlightData[ 0 ].backgroundColorRGB );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.class', 'has-text-color' );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
			.should( 'have.css', 'color', highlightData[ 0 ].textColorRGB );

		helpers.savePage();

		helpers.checkForBlockErrors( 'highlight' );

		helpers.viewPage();

		cy.get( 'p.wp-block-coblocks-highlight' )
			.contains( highlightData[ 0 ].text );

		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' ).invoke( 'attr', 'style' ).should( 'contain', 'background-color:' + highlightData[ 0 ].backgroundColor + ';' );
		cy.get( 'p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' ).invoke( 'attr', 'style' ).should( 'contain', 'color:' + highlightData[ 0 ].textColor );

		helpers.editPage();
	} );

	/**
	 * Test multiple highlight blocks with custom color settings on each
	 */
	it( 'Test multiple highlight blocks with custom color settings.', function() {
		cy.wrap( highlightData ).each( ( text, index ) => {
			const nthChild = ( index + 1 );

			// Only clear the editor window on the first block
			helpers.addCoBlocksBlockToPage( ( 0 === index ), 'highlight' );

			cy.get( '.wp-block[data-type="coblocks/highlight"]:nth-child(' + nthChild + ') p.wp-block-coblocks-highlight' ).find('mark')
				.type( highlightData[ index ].text );

			helpers.setColorSetting( 'background', highlightData[ index ].backgroundColor );
			helpers.setColorSetting( 'text', highlightData[ index ].textColor );

			cy.get( '.wp-block[data-type="coblocks/highlight"]:nth-child(' + nthChild + ') p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
				.should( 'have.class', 'has-background' );

			cy.get( '.wp-block[data-type="coblocks/highlight"]:nth-child(' + nthChild + ') p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
				.should( 'have.css', 'background-color', highlightData[ index ].backgroundColorRGB );

			cy.get( '.wp-block[data-type="coblocks/highlight"]:nth-child(' + nthChild + ') p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
				.should( 'have.class', 'has-text-color' );

			cy.get( '.wp-block[data-type="coblocks/highlight"]:nth-child(' + nthChild + ') p.wp-block-coblocks-highlight mark.wp-block-coblocks-highlight__content' )
				.should( 'have.css', 'color', highlightData[ index ].textColorRGB );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'highlight' );

		helpers.viewPage();

		cy.wrap( highlightData ).each( ( text, index ) => {
			const nthChild = ( index + 1 );

			cy.get( 'p.wp-block-coblocks-highlight:nth-child(' + nthChild + ') mark.wp-block-coblocks-highlight__content' )
				.should( 'contain', highlightData[ index ].text );

			cy.get( 'p.wp-block-coblocks-highlight:nth-child(' + nthChild + ') mark.wp-block-coblocks-highlight__content' ).invoke( 'attr', 'style' ).should( 'contain', 'background-color:' + highlightData[ index ].backgroundColor + ';' );
			cy.get( 'p.wp-block-coblocks-highlight:nth-child(' + nthChild + ') mark.wp-block-coblocks-highlight__content' ).invoke( 'attr', 'style' ).should( 'contain', 'color:' + highlightData[ index ].textColor );
		} );

		helpers.editPage();
	} );

	/**
   * Test the highlight block custom classes
   */
	it( 'Test the highlight block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'highlight' );

		cy.get( 'p.wp-block-coblocks-highlight' ).find('mark')
			.type( highlightData[ 0 ].text );

		helpers.addCustomBlockClass( 'my-custom-class', 'highlight' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'highlight' );

		cy.get( '.wp-block-coblocks-highlight' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-highlight' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

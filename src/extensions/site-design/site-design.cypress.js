import {
	hexToRGB,
} from '../../../.dev/tests/cypress/helpers.js';

describe( 'Test CoBlocks Site Design Component', () => {
	let dataDesignStyles;

	beforeEach( () => {
		cy.window().then( ( win ) => {
			dataDesignStyles = win.wp.data.select( 'coblocks/site-design' ).getDesignStyles();
		} );
	} );

	it( 'renders site design toolbar button as pinned', () => {
		cy.get( '.interface-pinned-items' ).get( '[aria-label="Site design"]' ).should( 'exist' );
	} );

	it( 'switches sidebar to site design module', () => {
		cy.get( '[aria-label="Site design"]' ).click();
		cy.get( '.interface-complementary-area-header' ).should( 'contain', 'Site design' );
	} );

	// @todo fix those cypress test since we are not using radio control anymore
	it.skip( 'updates the design style', () => {
		const designStyles = dataDesignStyles.flatMap( ( style ) => style.slug );

		// Click the last element to reset the font settings (in case of theme defaults).
		cy.get( '.components-radio-control__input' ).last().click();

		designStyles.forEach( ( styleSlug, styleIndex ) => {
			cy.get( '.components-radio-control__input[value="' + styleSlug + '"]' ).should( 'exist' );
			cy.get( '.components-radio-control__input[value="' + styleSlug + '"]' ).click();

			const styleFonts = Object.keys( dataDesignStyles[ styleIndex ].fonts );

			cy.get( '.components-site-design-fonts__option.is-selected' ).find( '.components-site-design-fonts__option__primary' ).then( ( $el ) => {
				expect( styleFonts ).to.include( $el.text() );
			} );

			cy.get( '.color-palette__body.is-opened .color-palette__preview-button' ).find( '.component-color-indicator' ).each( ( $el, index ) => {
				const paletteHexToRGB = Object.values( dataDesignStyles[ styleIndex ].palettes[ 0 ][ 1 ] ).map( hexToRGB );
				expect( paletteHexToRGB[ index ] ).to.equal( $el.get( 0 ).style.backgroundColor );
			} );
		} );
	} );

	it.skip( 'restores the design style settings on reload', () => {
		// Add page content so we can publish the page.
		cy.get( '.editor-post-title__input' ).type( 'Page Title{downarrow}Testing' );
		cy.get( '[aria-label="Site design"]' ).click();

		// Set custom design settings.
		cy.get( '.components-radio-control__input[value="modern"]' ).click();
		cy.get( '.color-palette__preview-button' ).last().click();
		cy.get( '.components-site-design-fonts__option.is-heebo' ).click();

		// PUblish and refresh the page.
		cy.get( '.editor-post-publish-button' ).click();
		cy.reload();

		// Make sure the controls are loaded with the previously selected settings.
		cy.get( '.components-radio-control__input[value="modern"]' ).should( ( $el ) => expect( $el ).to.be.checked );
		cy.get( '.color-palette__body' ).last().should( ( $el ) => expect( $el ).to.have.class( 'is-opened' ) );
		cy.get( '.components-site-design-fonts__option.is-heebo' ).should( ( $el ) => expect( $el ).to.have.class( 'is-selected' ) );
	} );
} );

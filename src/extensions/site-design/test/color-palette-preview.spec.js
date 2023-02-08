import { fireEvent, render } from '@testing-library/react';

import {
	registerStore,
	select,
} from '@wordpress/data';
import {
	ColorIndicator,
	ColorPicker,
} from '@wordpress/components';

// Mock `core/block-editor` store.
registerStore( 'core/block-editor', {
	reducer: ( state = {}, action ) => ( 'UPDATE_ACTIONS' === action.type ) && { ...state },
	actions: {
		updateSettings: () => ( { type: 'UPDATE_SETTINGS' } ),
	},
	selectors: {
		getSettings: ( state ) => state,
	},
} );

// Mock DOM for style tag updates.
global.document = new HTMLDocument;
const stylesElement = global.document.createElement( 'style' );
stylesElement.setAttribute( 'class', 'editor-styles-wrapper' );
document.getElementsByTagName( 'head' )[ 0 ].appendChild( stylesElement );

import '../data/store';
import STORE_KEY from '../data/constants';
import {
	ColorPalettePreviews,
	getColorValue,
} from '../color-palette-preview';

describe( 'color-palette-preview', () => {
	describe( 'ColorPalettePreviews', () => {
		let wrapper;

		const setup = ( props = {} ) => {
			const { container } = render( <ColorPalettePreviews { ...props } /> );
			return container;
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		describe( 'Default Palettes', () => {
			it( 'should be rendered', () => {
				expect( wrapper.querySelectorAll( '.components-site-design-color-palettes' ) ).toHaveLength( 1 );
			} );

			it( 'should update colors when new color has been selected', () => {
				expect( select( STORE_KEY ).getCurrentColors().primary ).toEqual( '#c76919' );

				const newPalette = wrapper.querySelectorAll( '.color-palette' );

				fireEvent.click( newPalette[1] );

				expect( select( STORE_KEY ).getCurrentColors().primary ).toEqual( '#165153' );
			} );

			it( 'should do nothing when the same color has been selected', () => {
				const newPalette = wrapper.querySelectorAll( '.color-palette' )[ 1 ];

				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'two' );

				fireEvent.click( newPalette );

				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'two' );
			} );
		} );

		describe( 'Custom Palette', () => {
			it( 'should display Custom Palette when using a custom palette', () => {
				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'two' );
				expect( wrapper.querySelector( '.color-palette-custom' ) ).toBeInTheDocument;

				const button = wrapper.querySelector( '.color-palettes__custom-button' );

				fireEvent.click( button );

				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'custom' );
				expect( wrapper.querySelector( '.color-palette-custom' ) ).toBeInTheDocument;
			} );

			it( 'should dismiss custom palette on close button', () => {
				const palette = wrapper.querySelectorAll( '.color-palette' )[1];

				fireEvent.click( palette );

				const customPaletteButton = wrapper.querySelector( '.color-palettes__custom-button' );

				fireEvent.click( customPaletteButton );

				expect( wrapper.querySelector( '.color-palette-custom' ) ).toBeInTheDocument;

				const liveSiteDismiss = wrapper.querySelector( '.color-palette-custom .components-site-design__custom__dismiss' );

				fireEvent.click( liveSiteDismiss )

				expect( wrapper.querySelector( '.color-palette-custom' ) ).toBeInTheDocument;
			} );
		} );

		describe( '#methods', () => {
			describe( 'getColorValue()', () => {
				it( 'should return the right color value', () => {
					const currentColors = {
						primary: '#111111',
						secondary: '222222',
					};

					expect( getColorValue( currentColors, 'primary', '#123123' ) ).toBe( '#111111' );
					expect( getColorValue( currentColors, 'secondary', '#123123' ) ).toBe( '#222222' );
					expect( getColorValue( currentColors, 'someNonExistingColor', '#123123' ) ).toBe( '#123123' );
				} );
			} );
		} );
	} );
} );

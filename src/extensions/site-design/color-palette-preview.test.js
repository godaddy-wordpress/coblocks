import { mount } from 'enzyme';

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

import './data/store';
import STORE_KEY from './data/constants';
import {
	ColorPalettePreviews,
	getColorValue,
} from './color-palette-preview';

describe( 'color-palette-preview', () => {
	describe( 'ColorPalettePreviews', () => {
		let wrapper;

		const setup = ( props = {} ) => {
			return mount( <ColorPalettePreviews { ...props } /> );
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		describe( 'Default Palettes', () => {
			it( 'should be rendered', () => {
				expect( wrapper.exists( '.components-site-design-color-palettes' ) ).toEqual( true );
			} );

			it( 'should update colors when new color has been selected', () => {
				let selectedPalette = wrapper.find( '.color-palette.is-selected' );
				const selectedIndicator = selectedPalette.find( ColorIndicator ).at( 2 );

				expect( selectedIndicator.prop( 'colorValue' ) ).toEqual( '#c76919' );
				expect( select( STORE_KEY ).getCurrentColors().primary ).toEqual( '#c76919' );

				const newPalette = wrapper.find( '.color-palette' ).at( 2 );

				newPalette.invoke( 'onClick' )();
				selectedPalette = wrapper.find( '.color-palette.is-selected' );

				expect( selectedPalette.find( ColorIndicator ).at( 2 ).prop( 'colorValue' ) ).toEqual( '#165153' );
				expect( select( STORE_KEY ).getCurrentColors().primary ).toEqual( '#165153' );
			} );

			it( 'should do nothing when the same color has been selected', () => {
				const newPalette = wrapper.find( '.color-palette' ).at( 2 );

				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'two' );

				newPalette.invoke( 'onClick' )();

				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'two' );
			} );
		} );

		describe( 'Custom Palette', () => {
			it( 'should display Custom Palette when using a custom palette', () => {
				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'two' );
				expect( wrapper.exists( '.color-palette-custom' ) ).toEqual( false );

				wrapper.find( '.color-palettes__custom-button' ).invoke( 'onClick' )();

				expect( select( STORE_KEY ).getColorPalette() ).toEqual( 'custom' );
				expect( wrapper.exists( '.color-palette-custom' ) ).toEqual( true );
			} );

			it( 'should change colors using the Color Picker', () => {
				wrapper.find( '.color-palette-custom__color' ).find( 'button' ).first().invoke( 'onClick' )();
				wrapper.find( ColorPicker ).invoke( 'onChangeComplete' )( { hex: '#123456' } );

				expect( select( STORE_KEY ).getCurrentColors().primary ).toEqual( '#123456' );
			} );

			it( 'should dismiss custom palette on close button', () => {
				const palette = wrapper.find( '.color-palette' ).at( 1 );

				palette.invoke( 'onClick' )();
				wrapper.find( '.color-palettes__custom-button' ).invoke( 'onClick' )();

				expect( wrapper.exists( '.color-palette-custom' ) ).toEqual( true );

				wrapper.find( '.color-palette-custom .components-site-design__custom__dismiss' ).invoke( 'onClick' )();

				expect( wrapper.exists( '.color-palette-custom' ) ).toEqual( false );
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

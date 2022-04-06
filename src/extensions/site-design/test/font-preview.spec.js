import { mount } from 'enzyme';

import {
	register,
	select,
} from '@wordpress/data';

// Mock `core/block-editor` store.
register( 'core/block-editor', {
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
	FontPreviews,
	FontPreview,
} from '../font-preview';

describe( 'font-preview', () => {
	describe( 'FontPreviews', () => {
		let wrapper;

		const setup = ( props = {} ) => {
			return mount( <FontPreviews { ...props } /> );
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'should be rendered', () => {
			expect( wrapper.exists( '.site-design--fonts__panel' ) ).toEqual( true );
		} );
	} );

	describe( 'FontPreview', () => {
		let wrapper;

		const defaultProps = {
			font: [
				[ 'Heebo', [ 400, 700 ] ],
				[ 'Fira Code', [ 400, 700 ] ],
			],
		};

		const setup = ( props = {} ) => {
			const setupProps = { ...defaultProps, ...props };
			return mount( <FontPreview { ...setupProps } /> );
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'should be rendered', () => {
			expect( wrapper.exists( '.components-site-design-fonts__option' ) ).toEqual( true );
		} );

		it( 'should update the selected font', () => {
			wrapper = setup();

			expect( select( STORE_KEY ).getSelectedFonts() ).toEqual( [ [ 'Poppins', [ '600' ] ], [ 'Quicksand', [ '400', '600' ] ] ] );

			wrapper.find( '.components-site-design-fonts__option__section' ).invoke( 'onClick' )();
			expect( select( STORE_KEY ).getSelectedFonts() ).toEqual( defaultProps.font );
		} );
	} );
} );

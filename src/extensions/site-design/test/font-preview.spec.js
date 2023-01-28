import { fireEvent, render, screen } from '@testing-library/react';

import {
	registerStore,
	select,
} from '@wordpress/data';

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
	FontPreviews,
	FontPreview,
} from '../font-preview';

describe( 'font-preview', () => {
	describe( 'FontPreviews', () => {
		let wrapper;

		const setup = ( props = {} ) => {
			const { container } = render( <FontPreviews { ...props } /> );

			return container;
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'should be rendered', () => {
			expect( wrapper.getElementsByClassName( 'site-design--fonts__panel' ).length ).toBe( 1 );
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
			const { container } = render( <FontPreview { ...setupProps } /> );

			return container;
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'should be rendered', () => {
			expect( wrapper.getElementsByClassName( 'components-site-design-fonts__option' ).length ).toBe( 1 );
		} );

		it( 'should update the selected font', () => {
			expect( select( STORE_KEY ).getSelectedFonts() ).toEqual( [ [ 'Poppins', [ '600' ] ], [ 'Quicksand', [ '400', '600' ] ] ] );

			fireEvent.click( screen.getByRole('button') );

			expect( select( STORE_KEY ).getSelectedFonts() ).toEqual( defaultProps.font );
		} );
	} );
} );

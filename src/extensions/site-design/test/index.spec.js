import { render } from '@testing-library/react';

import '../data/store';
import { SiteDesignControls } from '../component';

const setup = ( props = {} ) => {
	const { container } = render( <SiteDesignControls { ...props } /> );
	return container;
};

// Mock DOM for style tag updates.
global.document = new HTMLDocument;
const stylesElement = global.document.createElement( 'style' );
stylesElement.setAttribute( 'class', 'editor-styles-wrapper' );
document.getElementsByTagName( 'head' )[ 0 ].appendChild( stylesElement );

// Setup API globals.
global.ajaxurl = '';
global.window.fetch = () => new Promise( () => {} );

describe.only( 'SiteDesign', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = setup();
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders', () => {
		expect( wrapper.querySelector( '.components-site-design-designs' ) ).toBeInTheDocument;
		expect( wrapper.querySelector( '.site-design--colors__panel' ) ).toBeInTheDocument;
		expect( wrapper.querySelector( '.site-design--colors__panel' ) ).toBeInTheDocument;
		expect( wrapper.querySelector( '.components-site-design-fonts' ) ).toBeInTheDocument;
	} );
} );

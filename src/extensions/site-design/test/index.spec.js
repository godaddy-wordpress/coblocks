import { shallow } from 'enzyme';

import '../data/store';
import { SiteDesignControls } from '../component';
import DesignPreviews from '../design-preview';
import ColorPalettePreviews from '../color-palette-preview';
import FontPreviews from '../font-preview';

const setup = ( props = {} ) => {
	return shallow( <SiteDesignControls { ...props } /> );
};

// Mock DOM for style tag updates.
global.document = new HTMLDocument;
const stylesElement = global.document.createElement( 'style' );
stylesElement.setAttribute( 'class', 'editor-styles-wrapper' );
document.getElementsByTagName( 'head' )[ 0 ].appendChild( stylesElement );

// Setup API globals.
global.ajaxurl = '';
global.window.fetch = () => new Promise( () => {} );

describe( 'SiteDesign', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = setup();
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders', () => {
		expect( wrapper.find( DesignPreviews ) ).toHaveLength( 1 );
		expect( wrapper.find( ColorPalettePreviews ) ).toHaveLength( 1 );
		expect( wrapper.find( FontPreviews ) ).toHaveLength( 1 );
	} );
} );

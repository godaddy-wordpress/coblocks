import { mount } from 'enzyme';
import { select } from '@wordpress/data';

import '../data/store';
import STORE_KEY from '../data/constants';
import DesignPreviews from '../design-preview';

// Setup API globals.
global.ajaxurl = '';
global.window.fetch = () => new Promise( () => {} );

const setup = ( props = {} ) => {
	return mount( <DesignPreviews { ...props } /> );
};

describe( 'design-preview', () => {
	const styles = select( STORE_KEY ).getDesignStyles();
	let wrapper;

	beforeEach( () => {
		wrapper = setup();
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	/**
	 * Following tests are being skip because of an error with Animations and React using Jest.
	 */
	describe( '#render', () => {
		it( 'should be rendered', () => {
			expect( wrapper.exists( '.components-site-design-designs' ) ).toEqual( true );
			expect( wrapper.find( '.components-site-design-designs__design' ) ).toHaveLength( styles.length );
		} );

		it( 'should render the selected design when panel is closed', () => {
			const panel = wrapper.find( '.site-design--designs__panel' ).at( 0 );

			panel.invoke( 'onToggle' )();

			expect( wrapper.exists( '.components-site-design-design' ) ).toEqual( true );

			panel.invoke( 'onToggle' )();

			expect( wrapper.exists( '.components-site-design-design' ) ).toEqual( false );
		} );
	} );

	describe( '#methods', () => {
		describe( 'updateDesign()', () => {
			it( 'should update design on button click', () => {
				const button = wrapper.find( '.components-site-design-designs__design[data-test="design-button-modern"]' );

				expect( button ).toHaveLength( 1 );
				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'traditional' );

				button.invoke( 'onClick' )();

				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'modern' );
			} );

			it( 'should not update design if it is the same one', () => {
				const button = wrapper.find( '.components-site-design-designs__design[data-test="design-button-modern"]' );

				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'modern' );

				button.invoke( 'onClick' )();

				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'modern' );
			} );
		} );
	} );
} );

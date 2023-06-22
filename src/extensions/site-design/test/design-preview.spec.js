import { render, fireEvent } from '@testing-library/react';
import { select } from '@wordpress/data';

import '../data/store';
import STORE_KEY from '../data/constants';
import DesignPreviews from '../design-preview';

// Setup API globals.
global.ajaxurl = '';
global.window.fetch = () => new Promise( () => {} );
global.coblocksBlockData = {};

const setup = ( props = {} ) => {
	const { container } = render( <DesignPreviews { ...props } /> );
	return container;
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
			expect( wrapper.querySelectorAll( '.components-site-design-designs' ) ).toHaveLength( 1 );
			expect( wrapper.querySelectorAll( '.components-site-design-designs__design' ) ).toHaveLength( styles.length );
		} );
	} );

	describe( '#methods', () => {
		describe( 'updateDesign()', () => {
			it( 'should update design on button click', () => {
				const button = wrapper.querySelectorAll( '.components-site-design-designs__design[data-test="design-button-modern"]' );

				expect( button ).toHaveLength( 1 );
				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'traditional' );

				fireEvent.click( button[0] );

				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'modern' );
			} );

			it( 'should not update design if it is the same one', () => {
				const button = wrapper.querySelectorAll( '.components-site-design-designs__design[data-test="design-button-modern"]' );

				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'modern' );

				fireEvent.click( button[0] );

				expect( select( STORE_KEY ).getDesignStyle() ).toBe( 'modern' );
			} );
		} );
	} );
} );

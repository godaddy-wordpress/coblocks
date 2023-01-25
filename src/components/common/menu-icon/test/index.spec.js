/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import CoBlocksMenuIcon from '../index';

describe( 'coblocks-menu-icon', () => {
	let wrapper;

	beforeEach( () => {
		const { container } = render( <CoBlocksMenuIcon /> );

		wrapper = container;
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( '#render', () => {
		it( 'should be rendered', () => {
			expect( wrapper.getElementsByClassName( 'coblocks-menu-icon' ).length ).toBe( 1 );
		} );
	} );
} );

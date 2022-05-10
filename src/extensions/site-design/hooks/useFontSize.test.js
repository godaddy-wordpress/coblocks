/**
 * External dependencies
 */
import { renderHook } from '@testing-library/react-hooks';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import useFontSize from './useFontSize';

const elementMock = [
	{
		style: {
			setProperty: jest.fn(),
		},
		value: <div />,
	},
];

const getElementByClassNameMock = jest.fn( () => elementMock );

jest.mock( '@wordpress/data/build/components/use-select', () => jest.fn() );

describe( 'site-design, hooks, useFontSize', () => {
	beforeEach( () => {
		Object.defineProperty( global.document, 'getElementsByClassName', {
			value: getElementByClassNameMock,
			writable: true,
		} );
	} );

	it( 'should return the right values when store is empty', () => {
		useSelect.mockReturnValue( undefined );

		const { result } = renderHook( () => useFontSize() );

		expect( result.current[ 0 ] ).toBeNaN();
		expect( result.current[ 1 ] ).toBeNaN();
		expect( document.getElementsByClassName ).not.toHaveBeenCalled();
	} );

	it( 'should return the right values when store is set', () => {
		useSelect
			.mockReturnValueOnce( '2.5rem' )
			.mockReturnValueOnce( {
				font_size: '5rem',
			} );

		const { result } = renderHook( () => useFontSize() );

		expect( result.current[ 0 ] ).toBe( 2.5 );
		expect( result.current[ 1 ] ).toBe( 5 );
		expect( document.getElementsByClassName ).toHaveBeenCalled();
	} );
} );

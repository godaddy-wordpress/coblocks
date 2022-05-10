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
import useTypeRatio from './useTypeRatio';

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

describe( 'site-design, hooks, useTypeRatio', () => {
	beforeEach( () => {
		Object.defineProperty( global.document, 'getElementsByClassName', {
			value: getElementByClassNameMock,
			writable: true,
		} );
	} );

	it( 'should return the right values when store is empty', () => {
		useSelect.mockReturnValue( undefined );

		const { result } = renderHook( () => useTypeRatio() );

		expect( result.current[ 0 ] ).toBeUndefined();
		expect( result.current[ 1 ] ).toBeUndefined();
		expect( document.getElementsByClassName ).not.toHaveBeenCalled();
	} );

	it( 'should return the right values when store is set', () => {
		useSelect
			.mockReturnValueOnce( 'someTypeRatio' )
			.mockReturnValueOnce( {
				type_ratio: 'someDesignStyleObjTypeRatio',
			} );

		const { result } = renderHook( () => useTypeRatio() );

		expect( result.current[ 0 ] ).toBe( 'someTypeRatio' );
		expect( result.current[ 1 ] ).toBe( 'someDesignStyleObjTypeRatio' );
		expect( document.getElementsByClassName ).toHaveBeenCalled();
	} );
} );

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
import useFonts from './useFonts';

const elementMock = [
	{
		style: {
			setProperty: jest.fn(),
		},
		value: <div />,
	},
];

jest.mock( '@wordpress/data/build/components/use-select', () => jest.fn() );

describe( 'site-design, hooks, useFonts', () => {
	it( 'should return the right values when store is empty', () => {
		Object.defineProperty( global.document, 'getElementsByClassName', {
			value: jest.fn( () => elementMock ),
			writable: true,
		} );

		useSelect
			.mockReturnValueOnce( 'someFonts' )
			.mockReturnValueOnce( undefined );

		const { result } = renderHook( () => useFonts() );

		expect( result.current[ 0 ] ).toBe( 'someFonts' );
		expect( result.current[ 1 ] ).toBeUndefined();
		expect( document.getElementsByClassName ).not.toHaveBeenCalled();
	} );

	it( 'should return the right values when currentFonts change', () => {
		Object.defineProperty( global.document, 'getElementsByClassName', {
			value: jest.fn( () => [ null ] ),
			writable: true,
		} );

		const currentFontsMock = [
			[
				'someFontHeadingName',
				'someFontHeadingWeights',
			], [
				'someFontBodyName',
				'someFontBodyWeights',
			],
		];

		useSelect
			.mockReturnValueOnce( 'someFonts' )
			.mockReturnValueOnce( currentFontsMock );

		const { result } = renderHook( () => useFonts() );

		expect( result.current[ 0 ] ).toBe( 'someFonts' );
		expect( result.current[ 1 ] ).toBe( currentFontsMock );
		expect( document.getElementsByClassName ).toHaveBeenCalled();
	} );
} );

/**
 * Internal dependencies.
 */
import ColorSettingsClasses from './classes';

describe( 'colors/classes', () => {
	it( 'returns an empty array of classes if textColor or customTextColor is undefined', () => {
		const props = {
			attributes: {
				textColor: null,
				customTextColor: null,
			},
		};
		expect( ColorSettingsClasses( props ) ).toEqual( expect.arrayContaining( [] ) );
	} );

	it( 'returns an array with has-text-color if textColor is defined', () => {
		const props = {
			attributes: {
				textColor: 'black',
				customTextColor: null,
			},
		};
		expect( ColorSettingsClasses( props ) ).toEqual(
			expect.arrayContaining( [ { 'has-text-color': props.attributes.textColor } ] )
		);
	} );

	it( 'returns an array with has-text-color if customTextColor is defined', () => {
		const props = {
			attributes: {
				textColor: null,
				customTextColor: 'black',
			},
		};
		expect( ColorSettingsClasses( props ) ).toEqual(
			expect.arrayContaining( [
				{ 'has-text-color': props.attributes.customTextColor },
			] )
		);
	} );
} );

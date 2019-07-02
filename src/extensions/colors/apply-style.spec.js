/**
 * Internal dependencies.
 */
import applyStyle from './apply-style';

describe( 'colors/applyStyle', () => {
	it( 'returns style attributes for block', () => {
		const attributes = {
			customTextColor: 'white',
			customBackgroundColor: 'black',
		};
		const expected = {
			color: attributes.customTextColor,
			backgroundColor: attributes.customBackgroundColor,
		};

		expect( applyStyle( attributes ) ).toMatchObject( expected );
	} );

	it( 'overrides color if customTextColor is defined', () => {
		const attributes = {
			color: 'white',
			customTextColor: 'black',
		};
		const expected = {
			color: attributes.customTextColor,
		};

		expect( applyStyle( attributes ) ).toMatchObject( expected );
	} );

	it( 'overrides backgroundColor if customBackgroundColor is defined', () => {
		const attributes = {
			backgroundColor: 'black',
			customBackgroundColor: 'white',
		};
		const expected = {
			backgroundColor: attributes.customBackgroundColor,
		};

		expect( applyStyle( attributes ) ).toMatchObject( expected );
	} );
} );

/**
 * Internal dependencies.
 */
import applyStyle from './apply-style';

describe( 'typography/applyStyle', () => {
	it( 'returns style attributes for block', () => {
		const attributes = {
			fontFamily: 'serif',
			lineHeight: 'normal',
			letterSpacing: 'normal',
			fontWeight: 'normal',
			textTransform: 'none',
		};
		const expected = {
			fontFamily: attributes.fontFamily,
			lineHeight: attributes.lineHeight,
			letterSpacing: attributes.letterSpacing,
			fontWeight: attributes.fontWeight,
			textTransform: attributes.textTransform,
		};

		expect( applyStyle( attributes ) ).toMatchObject( expected );
	} );

	it( 'overrides fontSize if customFontSize is defined', () => {
		const attributes = {
			fontSize: 'normal',
			customFontSize: 16,
		};
		const expected = {
			fontSize: attributes.customFontSize + 'px',
		};

		expect( applyStyle( attributes ) ).toMatchObject( expected );
	} );

	it( 'overrides color if customTextColor is defined', () => {
		const attributes = {
			color: 'black',
			customTextColor: 'white',
		};
		const expected = {
			color: attributes.customTextColor,
		};

		expect( applyStyle( attributes ) ).toMatchObject( expected );
	} );
} );

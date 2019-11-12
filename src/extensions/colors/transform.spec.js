/**
 * Internal dependencies.
 */
import ColorTransforms from './transform';

describe( 'colors/ColorTransforms', () => {
	it( 'returns color transform attributes', () => {
		const props = {
			textColor: 'white',
			customBackgroundColor: 'black',
		};
		const expected = {
			textColor: props.textColor,
			customBackgroundColor: props.customBackgroundColor,
		};

		expect( ColorTransforms( props ) ).toMatchObject( expected );
	} );
} );

/**
 * External dependencies
 */
import ShallowRenderer from 'react-test-renderer/shallow';

/**
 * Internal dependencies.
 */
import SaveComponent from '../save';

describe( 'coblocks/highlight/save', () => {
	it( 'renders', () => {
		const renderer = new ShallowRenderer();

		const attributes = {
			content: '',
			align: '',
			backgroundColor: '',
			customBackgroundColor: '',
			textColor: '',
			customTextColor: '',
			fontSize: '',
			customFontSize: ''
		};

		renderer.render( <SaveComponent attributes={attributes} /> );

		expect( renderer.getRenderOutput() ).toMatchSnapshot();
	} );
} );

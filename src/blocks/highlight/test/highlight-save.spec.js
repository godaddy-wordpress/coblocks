/**
 * External dependencies
 */
import ShallowRenderer from 'react-test-renderer/shallow';
import { registerBlockType, getSaveContent } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe( 'coblocks/highlight/save', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

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

		const Save = settings.save;
		renderer.render( <Save attributes={ attributes } /> );

		expect( renderer.getRenderOutput() ).toMatchSnapshot();
	} );

	it( 'saves', () => {
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

		const content = getSaveContent(
			{ name, save: settings.save },
			attributes,
		);

		expect( content ).toMatchSnapshot();
	} );
} );

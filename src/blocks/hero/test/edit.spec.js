/**
 * External dependencies
 */
import ShallowRenderer from 'react-test-renderer/shallow';
import { getBlockDefaultClassName } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name } from '../index';
import { Edit } from '../edit';

const defaultProps = {
	className: getBlockDefaultClassName( name ),
	attributes: {},
};

describe( 'coblocks/hero edit', () => {
	it( 'should render', () => {
		const renderer = new ShallowRenderer();
		renderer.render( <Edit { ...defaultProps } /> );
		const component = renderer.getRenderOutput();

		expect( component ).toBeDefined();
		expect( component ).toMatchSnapshot();
	} );
} );

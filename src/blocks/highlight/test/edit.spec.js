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

describe( 'coblocks/highlight edit', () => {
	it( 'should render', () => {
		const renderer = new ShallowRenderer();
		renderer.render( <Edit { ...defaultProps } /> );
		const component = renderer.getRenderOutput();

		expect( component ).toBeDefined();
		expect( component ).toMatchSnapshot();
	} );

	it( 'should render with background color', () => {
		const renderer = new ShallowRenderer();
		renderer.render( <Edit { ...Object.assign( {}, defaultProps, {
			backgroundColor: { color: '#123456' },
		} ) } /> );
		const component = renderer.getRenderOutput();

		const markElement = component.props.children[ 2 ].props.children.props;

		expect( component ).toBeDefined();
		expect( markElement.className.includes( 'has-background' ) ).toBe( true );
		expect( markElement.style.backgroundColor ).toBe( '#123456' );
	} );

	it( 'should render with text color', () => {
		const renderer = new ShallowRenderer();
		renderer.render( <Edit { ...Object.assign( {}, defaultProps, {
			textColor: { color: '#123456' },
		} ) } /> );
		const component = renderer.getRenderOutput();

		const markElement = component.props.children[ 2 ].props.children.props;

		expect( component ).toBeDefined();
		expect( markElement.className.includes( 'has-text-color' ) ).toBe( true );
		expect( markElement.style.color ).toBe( '#123456' );
	} );

	it( 'should render with font size', () => {
		const renderer = new ShallowRenderer();
		renderer.render( <Edit { ...Object.assign( {}, defaultProps, {
			fontSize: { size: 16 },
		} ) } /> );
		const component = renderer.getRenderOutput();

		const markElement = component.props.children[ 2 ].props.children.props;

		expect( component ).toBeDefined();
		expect( markElement.style.fontSize ).toBe( '16px' );
	} );
} );

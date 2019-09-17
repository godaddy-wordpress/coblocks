/**
 * External dependencies
 */
import ShallowRenderer from 'react-test-renderer/shallow';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import { registerCoreBlocks } from '@wordpress/block-library';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { name } from '../index';
import { Edit } from '../edit';

let renderer;

const defaultProps = {
	className: getBlockDefaultClassName( name ),
	attributes: {},
	setAttributes: jest.fn( object => {
		const instance = renderer.getMountedInstance();
		return Object.assign( instance.props.attributes, object );
	} ),
	onReplace: jest.fn( value => value ),
};

// Mock only specific exports of a package.
jest.mock( '@wordpress/block-editor', () => ( {
	...require.requireActual( '@wordpress/block-editor' ),
	RichText: () => <mock-richtext />,
} ) );

describe( 'coblocks/highlight edit', () => {
	it( 'should render', () => {
		renderer = new ShallowRenderer();
		renderer.render( <Edit { ...defaultProps } /> );
		const component = renderer.getRenderOutput();

		expect( component ).toBeDefined();
		expect( component ).toMatchSnapshot();
	} );

	it( 'should render with background color', () => {
		renderer = new ShallowRenderer();
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
		renderer = new ShallowRenderer();
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
		renderer = new ShallowRenderer();
		renderer.render( <Edit { ...Object.assign( {}, defaultProps, {
			fontSize: { size: 16 },
		} ) } /> );
		const component = renderer.getRenderOutput();

		const markElement = component.props.children[ 2 ].props.children.props;

		expect( component ).toBeDefined();
		expect( markElement.style.fontSize ).toBe( '16px' );
	} );

	it( 'RichText onChange', () => {
		renderer = new ShallowRenderer();
		renderer.render( <Edit { ...Object.assign( {}, defaultProps, {
			attributes: Object.assign( {}, defaultProps.attributes, {
				content: 'Lorem ipsum dolor sit amet.',
			} ),
		} ) } /> );

		const component = renderer.getRenderOutput();
		const markElement = component.props.children[ 2 ].props.children;

		expect( markElement.props.value ).toBe( 'Lorem ipsum dolor sit amet.' );

		markElement.props.onChange( 'onChange content' );
		expect( renderer.getMountedInstance().props.attributes.content ).toBe( 'onChange content' );
	} );

	it( 'RichText onRemove', () => {
		renderer = new ShallowRenderer();
		renderer.render( <Edit { ...defaultProps } /> );

		const component = renderer.getRenderOutput();
		const markElement = component.props.children[ 2 ].props.children;

		expect( markElement.props.onRemove() ).toEqual( [] );
	} );
} );

/**
 * External dependencies
 */
import { animated } from 'react-spring';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { Trail } from './index';

const defaultProps = {
	children: [
		( <div key="someChildKey1">Some child 1</div> ),
		( <div key="someChildKey1">Some child 2</div> ),
	],
	className: 'someClassName',
	config: { mass: 2 },
};

describe( 'animations-trail', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = shallow( <Trail { ...defaultProps } /> );
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( '#render', () => {
		it( 'should be rendered', () => {
			expect( wrapper.find( `.${ defaultProps.className }` ) ).toHaveLength( 1 );
			expect( wrapper.find( animated.div ) ).toHaveLength( defaultProps.children.length );
		} );
	} );
} );

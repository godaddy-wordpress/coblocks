/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import CoBlocksMenuIcon from '../index';

describe( 'coblocks-menu-icon', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = shallow( <CoBlocksMenuIcon /> );
	} );

	afterEach( () => {
		jest.clearAllMocks();
	} );

	describe( '#render', () => {
		it( 'should be rendered', () => {
			expect( wrapper.find( '.coblocks-menu-icon' ) ).toHaveLength( 1 );
		} );
	} );
} );

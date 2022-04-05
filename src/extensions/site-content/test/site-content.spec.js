import { shallow } from 'enzyme';
import { CoBlocksSiteContent } from '../index';
import { propsMockData } from './mock-data';

const defaultProps = {
	lockPostSaving: jest.fn(),
	getEntityRecord: jest.fn(),
	setupEditor: jest.fn(),
	unlockPostSaving: jest.fn(),
};

const setup = () => {
	return shallow( <CoBlocksSiteContent { ...defaultProps } { ...propsMockData } /> );
};

describe( 'SiteContent', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = setup();
	} );

	describe( '#render', () => {
		it( 'should render', () => {
			expect( wrapper.find( '.content-management' ) ).toHaveLength( 1 );
			expect( wrapper.find( '[data-test="post-type-panel"]' ) ).toHaveLength( 2 );
		} );
	} );

	describe( '#methods', () => {
		describe( 'loadPostIntoEditor', () => {
			it( 'should not call call props if wp_version = 5.7', () => {
				global.gdvSiteContentData = { wp_version: '5.7' };

				Object.defineProperty( window, 'location', {
					value: {
						href: undefined,
					},
				} );

				wrapper.find( '[data-test="post-type-panel"]' ).at( 1 ).invoke( 'loadPostIntoEditor' )();

				expect( window.location.href ).toEqual( '/wp-admin/post.php?post=undefined&action=edit' );
			} );
		} );
	} );
} );
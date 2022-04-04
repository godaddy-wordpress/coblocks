import { shallow } from 'enzyme';
import apiFetch from '@wordpress/api-fetch';
import { PostTypePanel } from './post-type-panel';
import PostMenuActions from './post-menu-actions';
import { propsMockData, propsPostTypeMockData } from './tests/mock-data';

const defaultProps = {
	...propsMockData, // postType, currentPostId, entities, postTypes

	getEntityRecord: jest.fn(),
	currentPostType: 'page',
	homepageId: 1,
	homepageType: 'page',
	isInRenameMode: false,
	settingsEntity: {
		baseURL: 'someBaseUrl',
	},

	loadPostIntoEditor: jest.fn(),
	createErrorNotice: jest.fn(),
	createSuccessNotice: jest.fn(),
	editEntityRecord: jest.fn(),
	saveEntityRecord: jest.fn( () => Promise.resolve( { data: 1 } ) ),
	receiveEntityRecords: jest.fn(),
	savePost: jest.fn(),
	setRenameMode: jest.fn(),
	cancelRenameMode: jest.fn(),
};

jest.mock( '@wordpress/api-fetch', () => jest.fn() );

const setup = ( props = {} ) => {
	const setupProps = { ...defaultProps, ...props };

	return shallow( <PostTypePanel { ...setupProps } /> );
};

describe( 'post-type-panel', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = setup();
	} );

	describe( '#render', () => {
		it( 'should render default content for Site Content Panel with Pages', () => {
			wrapper = setup( {
				postType: {
					...propsPostTypeMockData,
					slug: 'page',
				},
			} );

			expect( wrapper.find( '.content-management__panel' ) ).toHaveLength( 1 );
			expect( wrapper.find( PostMenuActions ) ).toHaveLength( defaultProps.entities.length );
		} );

		it( 'should render default content for Site Content Panel with Posts', () => {
			expect( wrapper.find( '.content-management__panel' ) ).toHaveLength( 1 );
			expect( wrapper.find( PostMenuActions ) ).toHaveLength( defaultProps.entities.length );
		} );
	} );

	describe( '#methods', () => {
		describe( 'onDelete()', () => {
			// TODO: This should have an assertion.
			// eslint-disable-next-line jest/expect-expect
			it( 'should delete', () => {
				apiFetch.mockImplementation( () => Promise.resolve( { data: 'someData' } ) );

				const postMenuActions = wrapper.find( PostMenuActions ).first();

				postMenuActions.invoke( 'onDeletePost' )();
			} );
		} );

		describe( 'onUnDelete()', () => {
			it( 'should revert delete', () => {
				wrapper.instance().onUnDelete( { id: 2 } );

				expect( defaultProps.savePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onDuplicate()', () => {
			it( 'should duplicate', () => {
				apiFetch.mockImplementation( () => Promise.resolve( { data: 'someData' } ) );

				const postMenuActions = wrapper.find( PostMenuActions ).first();

				postMenuActions.invoke( 'onDuplicatePost' )();

				expect( apiFetch ).toHaveBeenCalled();
			} );
		} );

		describe( 'onPin()', () => {
			it( 'should pin post', () => { // eslint-disable-line jest/expect-expect
				apiFetch.mockImplementation( () => Promise.resolve( { data: 'someData' } ) );

				const postMenuActions = wrapper.find( PostMenuActions ).first();

				postMenuActions.invoke( 'onPinPost' )();

				expect( apiFetch ).toHaveBeenCalled();
			} );
		} );

		describe( 'onSetAsHome()', () => {
			it( 'should set as home page', () => {
				apiFetch.mockImplementation( () => Promise.resolve( { data: 'someData' } ) );

				const postMenuActions = wrapper.find( PostMenuActions ).first();

				postMenuActions.invoke( 'onSetAsHomePost' )();

				expect( apiFetch ).toHaveBeenCalled();
			} );
		} );

		describe( 'handleInputKeys()', () => {
			it( 'should handle Enter key', () => {
				wrapper.instance().onCompleteRename = jest.fn();
				wrapper.instance().handleInputKeys(
					{
						key: 'Enter',
						preventDefault: jest.fn(),
					},
					{}
				);

				expect( wrapper.instance().onCompleteRename ).toHaveBeenCalled();
			} );

			it( 'should handle Escape key', () => {
				wrapper.instance().onResetRename = jest.fn();
				wrapper.instance().handleInputKeys(
					{
						key: 'Escape',
					},
					{}
				);

				expect( wrapper.instance().onResetRename ).toHaveBeenCalled();
			} );

			it( 'should handle Space key', () => {
				const preventDefault = jest.fn();

				wrapper.instance().handleInputKeys(
					{
						key: ' ',
						preventDefault,
						stopPropagation: jest.fn(),
					},
					{}
				);

				expect( preventDefault ).toHaveBeenCalled();
			} );

			it( 'should handle default', () => { // eslint-disable-line jest/expect-expect
				wrapper.instance().handleInputKeys(
					{
						key: 'someNonMappedKey',
					},
					{}
				);
			} );
		} );

		describe( 'add new page', () => {
			it( 'should be able to add a new page', () => {
				const url = `/wp-admin/post-new.php?post_type=${ defaultProps.postType.slug }`;

				Object.defineProperty( window, 'location', {
					value: {
						href: url,
					},
				} );

				wrapper.find( '.content-management__add-new-button' ).invoke( 'onClick' )();

				expect( window.location.href ).toEqual( url );
			} );
		} );
	} );
} );

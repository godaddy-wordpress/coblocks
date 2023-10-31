import { render, fireEvent } from '@testing-library/react';
import apiFetch from '@wordpress/api-fetch';
import { PostTypePanel } from '../post-type-panel';
import { propsMockData, propsPostTypeMockData } from './mock-data';

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

jest.mock( '@wordpress/api-fetch', () => jest.fn( () => Promise.resolve( { data: {} } ) ) );

const setup = ( props = {} ) => {
	const setupProps = { ...defaultProps, ...props };

	const { container } = render( <PostTypePanel { ...setupProps } /> );
	return container;
};

describe( 'post-type-panel', () => {
	describe( '#render', () => {
		it( 'should render default content for Site Content Panel with Pages', () => {
			const view = setup( {
				postType: {
					...propsPostTypeMockData,
					slug: 'page',
				},
			} );

			expect( view.querySelectorAll( '.content-management__panel' ) ).toHaveLength( 1 );
			expect( view.querySelectorAll( '.content-management__panel__actions' ) ).toHaveLength( defaultProps.entities.length );
		} );
	} );

	describe( '#methods', () => {
		describe( 'onDelete()', () => {
			it( 'should delete', () => {
				const view = setup( { currentPostType: 'post' } );

				const postMenuActions = view.querySelectorAll( '.content-management__panel__actions' )[ 0 ];
				const postMenuButtonToggle = postMenuActions.querySelectorAll( '.content-management__panel__actions__button' )[ 0 ];

				fireEvent.click( postMenuButtonToggle );

				const deleteButtonToggle = document.querySelectorAll( '.content-management-actions__item.is-destructive' )[ 0 ];

				expect( deleteButtonToggle.textContent ).toBe( `Delete ${ defaultProps.postType === 'page' ? 'Page' : 'Post' }` );

				fireEvent.click( deleteButtonToggle );

				const deleteButtonConfirm = document.querySelectorAll( '.content-management-actions__item.is-destructive' )[ 0 ];

				expect( deleteButtonConfirm.textContent ).toBe( 'Really delete?' );

				fireEvent.click( deleteButtonConfirm );

				expect( apiFetch ).toHaveBeenCalledWith( {
					method: 'DELETE',
					path: expect.any( String ),
				} );
			} );
		} );

		describe( 'onDuplicate()', () => {
			it( 'should duplicate', () => {
				const view = setup( { currentPostType: 'post' } );

				const postMenuActions = view.querySelectorAll( '.content-management__panel__actions' )[ 0 ];
				const postMenuButtonToggle = postMenuActions.querySelectorAll( '.content-management__panel__actions__button' )[ 0 ];

				fireEvent.click( postMenuButtonToggle );

				const duplicatePostButton = document.querySelectorAll( '.content-management-actions__item.duplicate-post' )[ 0 ];

				fireEvent.click( duplicatePostButton );

				expect( defaultProps.saveEntityRecord ).toHaveBeenCalledWith(
					'postType',
					defaultProps.postType.slug,
					{
						content: expect.any( String ),
						excerpt: expect.any( String ),
						status: 'draft',
						title: expect.any( String ),
					}
				);
			} );
		} );

		describe( 'onPin()', () => {
			it( 'should pin post', () => {
				const view = setup( { currentPostType: 'post' } );

				const postMenuActions = view.querySelectorAll( '.content-management__panel__actions' )[ 0 ];
				const postMenuButtonToggle = postMenuActions.querySelectorAll( '.content-management__panel__actions__button' )[ 0 ];

				fireEvent.click( postMenuButtonToggle );

				const pinPostButton = document.querySelectorAll( '.content-management-actions__item.pin-action' )[ 0 ];

				fireEvent.click( pinPostButton );

				expect( apiFetch ).toHaveBeenCalledWith( {
					data: {
						sticky: expect.any( Boolean ),
					},
					method: 'POST',
					path: expect.any( String ),
				} );
			} );
		} );

		describe( 'onSetAsHome()', () => {
			it( 'should set as home page', () => {
				const view = setup( {	currentPostType: 'post' } );

				const postMenuActions = view.querySelectorAll( '.content-management__panel__actions' )[ 2 ];
				const postMenuButtonToggle = postMenuActions.querySelectorAll( '.content-management__panel__actions__button' )[ 0 ];

				fireEvent.click( postMenuButtonToggle );

				const setHomePostButton = document.querySelectorAll( '.content-management-actions__item.set-home-post' )[ 0 ];

				expect( setHomePostButton.textContent ).toBe( 'Set as homepage' );

				fireEvent.click( setHomePostButton );

				const setHomePostConfirm = document.querySelectorAll( '.content-management-actions__item.is-confirming' )[ 0 ];

				expect( setHomePostConfirm.textContent ).toBe( 'Really set as homepage?' );

				fireEvent.click( setHomePostConfirm );

				expect( apiFetch ).toHaveBeenCalledWith( {
					data: {
						page_on_front: expect.any( Number ),
					},
					method: 'POST',
					path: expect.any( String ),
				} );
			} );
		} );

		describe( 'add new page', () => {
			it( 'should be able to add a new page', () => {
				const view = setup( { currentPostType: 'post' } );

				const url = `/wp-admin/post-new.php?post_type=${ defaultProps.postType.slug }`;

				Object.defineProperty( window, 'location', {
					value: {
						href: url,
					},
				} );

				fireEvent.click( view.querySelectorAll( '.content-management__add-new-button' )[ 0 ] );

				expect( window.location.href ).toEqual( url );
			} );
		} );
	} );
} );

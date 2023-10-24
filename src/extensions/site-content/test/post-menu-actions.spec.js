import { render, fireEvent } from '@testing-library/react';

import PostMenuActions from '../post-menu-actions';

const defaultProps = {
	postType: 'page',
	shouldDisplayHomepageAction: true,
	shouldDisplayPinAction: false,
	onDuplicatePost: jest.fn(),
	onDeletePost: jest.fn(),
	onRenamePost: jest.fn(),
	onSetAsHomePost: jest.fn(),
	onPinPost: jest.fn(),
};

const setup = ( props = {} ) => {
	const setupProps = { ...defaultProps, ...props };

	const { container } = render( <PostMenuActions { ...setupProps } /> );
	return container;
};

describe( 'post-menu-actions', () => {
	let wrapper;

	it( 'should render in wrapper', () => {
		wrapper = setup();
		// eslint-disable-next-line no-unused-expressions
		expect( wrapper.querySelectorAll( '.content-management__panel__actions__button' ) ).toHaveLength( 1 );
	} );

	describe( '#methods', () => {
		describe( 'onRenamePost()', () => {
			it( 'should trigger post rename', () => {
				wrapper = setup();
				const toggleButton = wrapper.querySelectorAll( '.content-management__panel__actions__button' )[ 0 ];
				fireEvent.click( toggleButton );

				const renameButton = document.querySelectorAll( '.content-management-actions__item' )[ 0 ];
				fireEvent.click( renameButton );

				expect( defaultProps.onRenamePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onDuplicatePost()', () => {
			it( 'should trigger post duplication', () => {
				wrapper = setup();
				const toggleButton = wrapper.querySelectorAll( '.content-management__panel__actions__button' )[ 0 ];

				fireEvent.click( toggleButton );

				const duplicateButton = document.querySelectorAll( '.content-management-actions__item' )[ 2 ];

				fireEvent.click( duplicateButton );

				expect( defaultProps.onDuplicatePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onDeletePost()', () => {
			it( 'should trigger post deletion', () => {
				wrapper = setup();
				const toggleButton = wrapper.querySelector( '.content-management__panel__actions__button' );

				fireEvent.click( toggleButton );

				let contentManagementItem = document.querySelectorAll( '.content-management-actions__item' )[ 3 ];

				fireEvent.click( contentManagementItem );

				contentManagementItem = document.querySelectorAll( '.content-management-actions__item' )[ 3 ];

				fireEvent.click( contentManagementItem );

				expect( defaultProps.onDeletePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onSetAsHomePost()', () => {
			it( 'should trigger post being set as home', () => {
				wrapper = setup();
				const toggleButton = wrapper.querySelector( '.content-management__panel__actions__button' );

				fireEvent.click( toggleButton );

				let contentManagementActionsItem = document.querySelectorAll( '.content-management-actions__item' )[ 1 ];

				fireEvent.click( contentManagementActionsItem );

				contentManagementActionsItem = document.querySelectorAll( '.content-management-actions__item' )[ 1 ];

				fireEvent.click( contentManagementActionsItem );

				expect( defaultProps.onSetAsHomePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onPinPost()', () => {
			it( 'should trigger post being pinned', () => {
				wrapper = setup( {
					postType: 'post',
					shouldDisplayHomepageAction: false,
					shouldDiplayPinAction: true,
				} );

				const toggleButton = wrapper.querySelector( '.content-management__panel__actions__button' );

				fireEvent.click( toggleButton );

				const pinButton = document.querySelectorAll( '.content-management-actions__item' )[ 1 ];

				fireEvent.click( pinButton );

				expect( defaultProps.onPinPost ).toHaveBeenCalled();
			} );

			it( 'should trigger post being unpinned', () => {
				wrapper = setup( {
					postType: 'post',
					isSticky: true,
					shouldDisplayHomepageAction: false,
					shouldDiplayPinAction: true,
				} );

				const toggleButton = wrapper.querySelector( '.content-management__panel__actions__button' );

				fireEvent.click( toggleButton );

				const pinButton = document.querySelectorAll( '.content-management-actions__item' )[ 1 ];

				fireEvent.click( pinButton );

				expect( defaultProps.onPinPost ).toHaveBeenCalled();
			} );
		} );
	} );

	it( 'should should toggle popover', () => {
		wrapper = setup();
		const toggleButton = wrapper.querySelectorAll( '.content-management__panel__actions__button' );
		expect( toggleButton ).toHaveLength( 1 );

		fireEvent.click( toggleButton[ 0 ] );
		expect( document.querySelectorAll( '.content-management__panel__actions__button.is-open' ) ).toHaveLength( 1 );
	} );
} );

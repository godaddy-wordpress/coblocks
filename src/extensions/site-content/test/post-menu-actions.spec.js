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

	beforeEach( () => {
		wrapper = setup();
	} );

	describe( '#render', () => {
		it( 'should show the dropdown button', () => {
			expect( wrapper.querySelector( '.content-management__panel__actions__button' ) ).toBeInTheDocument;
		} );

		it( 'should show the dropdown once activated', () => {
			const toggleButton = wrapper.querySelectorAll( '.content-management__panel__actions__button' )[0];

			expect( wrapper.querySelectorAll( '.content-management-actions' ) ).toHaveLength( 0 );

			fireEvent.click( toggleButton );

			expect( wrapper.querySelectorAll( '.content-management-actions' ) ).toBeInTheDocument;
		} );
	} );

	describe( '#methods', () => {
		describe( 'onRenamePost()', () => {
			it( 'should trigger post duplication', () => {
				const toggleButton = wrapper.querySelectorAll( '.content-management__panel__actions__button' )[0];

				fireEvent.click( toggleButton );

				const renameButton = wrapper.querySelectorAll( '.content-management-actions__item' )[0];

				fireEvent.click( renameButton );

				expect( defaultProps.onRenamePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onDuplicatePost()', () => {
			it( 'should trigger post duplication', () => {
				const toggleButton = wrapper.querySelector( '.content-management__panel__actions__button' );

				fireEvent.click( toggleButton );

				const duplicateButton = wrapper.querySelectorAll( '.content-management-actions__item' )[6];

				fireEvent.click( duplicateButton );

				expect( defaultProps.onDuplicatePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onDeletePost()', () => {
			it( 'should trigger post deletion', () => {
				const toggleButton = wrapper.querySelector( '.content-management__panel__actions__button' );

				fireEvent.click(toggleButton);

				const contentManagementItem = wrapper.querySelectorAll( '.content-management-actions__item' )[9];

				fireEvent.click( contentManagementItem );
				fireEvent.click( contentManagementItem );

				expect( defaultProps.onDeletePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onSetAsHomePost()', () => {
			it( 'should trigger post being set as home', () => {
				const toggleButton = wrapper.querySelector( '.content-management__panel__actions__button' );

				fireEvent.click( toggleButton );

				const contentManagementActionsItem = wrapper.querySelectorAll( '.content-management-actions__item' )[3];

				fireEvent.click( contentManagementActionsItem );
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

				const pinButton = wrapper.querySelectorAll( '.content-management-actions__item' )[3];

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

				const pinButton = wrapper.querySelectorAll( '.content-management-actions__item' )[3];

				fireEvent.click( pinButton );

				expect( defaultProps.onPinPost ).toHaveBeenCalled();
			} );
		} );
	} );
} );

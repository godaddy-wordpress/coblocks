import { mount } from 'enzyme';

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

	return mount( <PostMenuActions { ...setupProps } /> );
};

describe( 'post-menu-actions', () => {
	let wrapper;

	beforeEach( () => {
		wrapper = setup();
	} );

	describe( '#render', () => {
		it( 'should show the dropdown button', () => {
			expect( wrapper.find( '.content-management__panel__actions__button' ) ).toBeTruthy();
		} );

		it( 'should show the dropdown once activated', () => {
			const toggleButton = wrapper.find( '.content-management__panel__actions__button' ).first();

			expect( wrapper.find( '.content-management-actions' ) ).toHaveLength( 0 );

			toggleButton.invoke( 'onClick' )();

			expect( wrapper.find( '.content-management-actions' ) ).toBeTruthy();
		} );
	} );

	describe( '#methods', () => {
		describe( 'onRenamePost()', () => {
			it( 'should trigger post duplication', () => {
				const toggleButton = wrapper.find( '.content-management__panel__actions__button' ).first();

				toggleButton.invoke( 'onClick' )();

				const renameButton = wrapper.find( '.content-management-actions__item' ).at( 1 );

				renameButton.invoke( 'onClick' )();

				expect( defaultProps.onRenamePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onDuplicatePost()', () => {
			it( 'should trigger post duplication', () => {
				const toggleButton = wrapper.find( '.content-management__panel__actions__button' ).first();

				toggleButton.invoke( 'onClick' )();

				const duplicateButton = wrapper.find( '.content-management-actions__item' ).at( 7 );

				duplicateButton.invoke( 'onClick' )();

				expect( defaultProps.onDuplicatePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onDeletePost()', () => {
			it( 'should trigger post deletion', () => {
				const toggleButton = wrapper.find( '.content-management__panel__actions__button' ).first();
				toggleButton.invoke( 'onClick' )();

				wrapper.find( '.content-management-actions__item' ).at( 10 ).invoke( 'onClick' )();
				wrapper.find( '.content-management-actions__item' ).at( 10 ).invoke( 'onClick' )();

				expect( defaultProps.onDeletePost ).toHaveBeenCalled();
			} );
		} );

		describe( 'onSetAsHomePost()', () => {
			it( 'should trigger post being set as home', () => {
				const toggleButton = wrapper.find( '.content-management__panel__actions__button' ).first();

				toggleButton.invoke( 'onClick' )();

				wrapper.find( '.content-management-actions__item' ).at( 4 ).invoke( 'onClick' )();
				wrapper.find( '.content-management-actions__item' ).at( 4 ).invoke( 'onClick' )();

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

				const toggleButton = wrapper.find( '.content-management__panel__actions__button' ).first();

				toggleButton.invoke( 'onClick' )();

				const pinButton = wrapper.find( '.content-management-actions__item' ).at( 4 );

				pinButton.invoke( 'onClick' )();

				expect( defaultProps.onPinPost ).toHaveBeenCalled();
			} );

			it( 'should trigger post being unpinned', () => {
				wrapper = setup( {
					postType: 'post',
					isSticky: true,
					shouldDisplayHomepageAction: false,
					shouldDiplayPinAction: true,
				} );

				const toggleButton = wrapper.find( '.content-management__panel__actions__button' ).first();

				toggleButton.invoke( 'onClick' )();

				const pinButton = wrapper.find( '.content-management-actions__item' ).at( 4 );

				pinButton.invoke( 'onClick' )();

				expect( defaultProps.onPinPost ).toHaveBeenCalled();
			} );
		} );
	} );
} );

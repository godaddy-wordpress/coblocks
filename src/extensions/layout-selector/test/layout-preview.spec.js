/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';

import { registerCoreBlocks } from '@wordpress/block-library';
registerCoreBlocks();

/**
 * Internal dependencies.
 */
import {
	LayoutPreview,
	LayoutPreviewList,
	LayoutPreviewPlaceholder,
	LayoutSelectorResults,
} from '../layout-selector-results';

describe( 'layout-selector-results', () => {

	describe( 'LayoutPreviewList', () => {
		let wrapper;

		const layouts = [
			{
				label: 'layout-one',
				category: 'about',
				blocks: [ [ 'core/paragraph', { content: 'layout-one' }, [] ] ],
				parsedBlocks: [ [ 'core/paragraph', { content: 'layout-one' }, [] ] ],
			},
			{
				label: 'layout-two',
				category: 'about',
				blocks: [ [ 'core/paragraph', { content: 'layout-two' }, [] ] ],
				parsedBlocks: [ [ 'core/paragraph', { content: 'layout-two' }, [] ] ],
			},
			{
				label: 'layout-three',
				category: 'about',
				blocks: [ [ 'core/paragraph', { content: 'layout-three' }, [] ] ],
				parsedBlocks: [ [ 'core/paragraph', { content: 'layout-three' }, [] ] ],
			},
		];

		const defaultProps = {
			layouts,
			shownLayouts: layouts,
			onClickLayout: jest.fn(),
		};

		const setup = ( props = {} ) => {
			const setupProps = { ...defaultProps, ...props };
			return shallow( <LayoutPreviewList { ...setupProps } /> );
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'renders shown layouts', () => {
			expect( wrapper ).toHaveLength( layouts.length );
			expect( wrapper.find( 'LayoutPreview' ) ).toHaveLength( layouts.length );
			expect( wrapper.find( 'LayoutPreviewPlaceholder' ) ).toHaveLength( 0 );
		} );

		it( 'renders layout placeholders', () => {
			wrapper = setup( { shownLayouts: [] } );
			expect( wrapper ).toHaveLength( layouts.length );
			expect( wrapper.find( 'LayoutPreview' ) ).toHaveLength( 0 );
			expect( wrapper.find( 'LayoutPreviewPlaceholder' ) ).toHaveLength( layouts.length );
		} );

	} );

	describe( 'LayoutPreviewPlaceholder', () => {
		let wrapper;

		beforeEach( () => {
			wrapper = shallow( <LayoutPreviewPlaceholder /> );
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'renders', () => {
			expect( wrapper.exists( '.coblocks-layout-selector__layout' ) ).toEqual( true );
		} );

	} );

	describe( 'LayoutPreview', () => {
		let wrapper;

		const defaultProps = {
			layout: {
				label: 'layout-one',
				category: 'about',
				blocks: [ [ 'core/paragraph', { content: 'layout-one' }, [] ] ],
				parsedBlocks: [ [ 'core/paragraph', { content: 'layout-one' }, [] ] ],
			},
			onClick: jest.fn(),
		};

		const setup = ( props = {} ) => {
			return shallow( <LayoutPreview { ...props } /> );
		};

		beforeEach( () => {
			wrapper = setup( defaultProps );
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'renders', () => {
			expect( wrapper.exists( '.coblocks-layout-selector__layout' ) ).toEqual( true );
		} );

		it( 'should call onClick() on Button click', () => {
			wrapper.find( '.coblocks-layout-selector__layout' ).invoke( 'onClick' )();
			expect( defaultProps.onClick ).toHaveBeenCalled();
		} );

	} );

	describe( 'LayoutSelectorResults', () => {
		let wrapper;

		const defaultProps = {
			layouts: [
				{
					label: 'layout-one',
					category: 'about',
					blocks: [ [ 'core/paragraph', { content: 'layout-one' }, [] ] ],
					parsedBlocks: [ [ 'core/paragraph', { content: 'layout-one' }, [] ] ],
				},
				{
					label: 'layout-two',
					category: 'about',
					blocks: [ [ 'core/paragraph', { content: 'layout-two' }, [] ] ],
					parsedBlocks: [ [ 'core/paragraph', { content: 'layout-two' }, [] ] ],
				},
				{
					label: 'layout-three',
					category: 'about',
					blocks: [ [ 'core/paragraph', { content: 'layout-three' }, [] ] ],
					parsedBlocks: [ [ 'core/paragraph', { content: 'layout-three' }, [] ] ],
				},
			],
			category: 'about',
			onInsert: jest.fn(),
		};


		const setup = ( props = {} ) => {
			const setupProps = { ...defaultProps, ...props };
			return shallow( <LayoutSelectorResults { ...setupProps } /> );
		};

		beforeEach( () => {
			wrapper = setup();
		} );

		afterEach( () => {
			jest.clearAllMocks();
		} );

		it( 'renders', () => {
			expect( wrapper.exists( '.coblocks-layout-selector__layouts' ) ).toEqual( true );
		} );

		it( 'renders message when no layouts are available for the selected category', () => {
			wrapper = setup( { category: 'doesnotexist' } );
			expect( wrapper.find( '.coblocks-layout-selector__layout' ) ).toHaveLength( 0 );
			expect( wrapper.text() ).toContain( 'No layouts are available for this category.' );
		} );

	} );

} );

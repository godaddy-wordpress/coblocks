/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';

import { registerCoreBlocks } from '@wordpress/block-library';
import { createBlock, serialize, parse } from '@wordpress/blocks';
registerCoreBlocks();

/**
 * Internal dependencies.
 */
import {
	LayoutPreview,
	LayoutPreviewList,
	LayoutPreviewPlaceholder,
	LayoutSelectorResults,
	sanitizeBlocks,
} from '../layout-selector-results';
import * as helpers from '../../../../.dev/tests/jest/helpers';

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

	describe( 'sanitizeBlocks()', () => {
		beforeAll( () => {
			helpers.registerGalleryBlocks();
		} );

		it( 'sanitize blocks without breaking them', () => {
			const blocks = [
				createBlock( 'coblocks/gallery-stacked' ),
				createBlock( 'coblocks/gallery-masonry' ),
				{
					"clientId": "ff9f9721-eb6d-4817-ab60-cfceee6c28a8",
					"name": "core/gallery",
					"isValid": true,
					"attributes": {
					  "images": [
						{
						  "url": "https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=2&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion",
						  "link": "https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=2&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion",
						  "alt": "Image Description",
						  "id": "2",
						  "caption": ""
						},
						{
						  "url": "https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=3&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion",
						  "link": "https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=3&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion",
						  "alt": "Image Description",
						  "id": "3",
						  "caption": ""
						}
					  ],
					  "ids": [
						{},
						{}
					  ],
					  "caption": "",
					  "imageCrop": true,
					  "linkTo": "none",
					  "sizeSlug": "large",
					  "align": "wide",
					  "animation": "slideInBottom",
					  "noBottomMargin": false,
					  "noTopMargin": false,
					  "lightbox": false,
					  "filter": "none"
					},
					"innerBlocks": []
				  }
			];
			const sanitized = sanitizeBlocks( blocks );
			const selializedBlocks = serialize( sanitized );
			const parsedBlocks = parse( selializedBlocks );

			expect(
				parsedBlocks.filter( ( block ) => ! block.isValid ).map( helpers.filterBlockObjectResult )
			).toEqual( [] );
		} );
	} );

} );

/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { registerCoreBlocks } from '@wordpress/block-library';
import { createBlock, serialize, parse } from '@wordpress/blocks';
registerCoreBlocks();

import * as helpers from '../../../../.dev/tests/jest/helpers';

/**
 * Internal dependencies.
 */
import {
	LayoutPreviewList,
	sanitizeBlocks,
} from '../layout-selector-results';

jest.mock( '@wordpress/block-editor', () => ( {
	...jest.requireActual( '@wordpress/block-editor' ),
	// eslint-disable-next-line no-unused-vars
	BlockPreview: () => 'mocked BlockPreview',
} ) );

const layouts = [
	{
		label: 'layout-one',
		category: 'about',
		blocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: 'layout-one',
				},
				innerBlocks: [],
			},
		],
		parsedBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: 'layout-one',
				},
				innerBlocks: [],
			},
		],
	},
	{
		label: 'layout-two',
		category: 'about',
		blocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: 'layout-two',
				},
				innerBlocks: [],
			},
		],
		parsedBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: 'layout-two',
				},
				innerBlocks: [],
			},
		],
	},
	{
		label: 'layout-three',
		category: 'about',
		blocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: 'layout-three',
				},
				innerBlocks: [],
			},
		],
		parsedBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: 'layout-three',
				},
				innerBlocks: [],
			},
		],
	},
];

const defaultProps = {
	layouts,
	shownLayouts: layouts,
	onClickLayout: jest.fn(),
};

const setup = ( overrideProps = {} ) => {
	const { container } = render( <LayoutPreviewList { ...defaultProps } { ...overrideProps } /> );
	return container;
};

describe( 'layout-selector-results', () => {
	describe( 'when there are shown layouts available', () => {
		it( 'it renders the LayoutPreview component', () => {
			setup();
			expect( screen.queryAllByTestId( 'coblocks-layout-selector__layout-button' ) ).toHaveLength( layouts.length );
			expect( screen.queryAllByTestId( 'coblocks-layout-selector__layout-placeholder' ) ).toHaveLength( 0 );
		} );

		it( 'should call onClickLayout on Button click', () => {
			setup();
			fireEvent.click( screen.queryAllByTestId( 'coblocks-layout-selector__layout-button' )[ 0 ] );

			expect( defaultProps.onClickLayout ).toHaveBeenCalled();
		} );
	} );

	describe( 'when there are no shown layouts available', () => {
		it( 'should show the LayoutPreviewPlaceholder component', () => {
			setup( { shownLayouts: [] } );
			expect( screen.queryAllByTestId( 'coblocks-layout-selector__layout-placeholder' ) ).toHaveLength( layouts.length );
			expect( screen.queryAllByTestId( 'coblocks-layout-selector__layout-button' ) ).toHaveLength( 0 );
		} );
	} );

	describe( 'sanitize blocks', () => {
		beforeAll( () => {
			helpers.registerGalleryBlocks();
		} );

		it( 'sanitize blocks without breaking them', () => {
			const blocks = [
				createBlock( 'coblocks/gallery-stacked' ),
				createBlock( 'coblocks/gallery-masonry' ),
				{
					clientId: 'ff9f9721-eb6d-4817-ab60-cfceee6c28a8',
					name: 'core/gallery',
					isValid: true,
					attributes: {
						images: [
							{
								url: 'https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=2&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion',
								link: 'https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=2&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion',
								alt: 'Image Description',
								id: '2',
								caption: '',
							},
							{
								url: 'https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=3&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion',
								link: 'https://wpnux.godaddy.com/v2/api/image?aspect=3%3A4&index=3&lang=en_US&seed=wpnux_layout_home-1&size=large&category=fashion',
								alt: 'Image Description',
								id: '3',
								caption: '',
							},
						],
						ids: [
							{},
							{},
						],
						caption: '',
						imageCrop: true,
						linkTo: 'none',
						sizeSlug: 'large',
						align: 'wide',
						animation: 'slideInBottom',
						noBottomMargin: false,
						noTopMargin: false,
						lightbox: false,
						filter: 'none',
					},
					innerBlocks: [],
				},
			];

			const sanitized = sanitizeBlocks( blocks );

			const selializedBlocks = serialize( sanitized.splice( 0, 1 ) );
			const parsedBlocks = parse( selializedBlocks );

			expect(
				parsedBlocks.filter( ( block ) => ! block.isValid ).map( helpers.filterBlockObjectResult )
			).toEqual( [] );
		} );
	} );
} );

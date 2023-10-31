/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import * as settings from '../index';
import { registerBlock } from '../../../../src/utils/helper';

// Make variables accessible for all tests.
let block;
let serializedBlock;

const baseAttributes = {
	images: [
		{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1, index: 0 },
		{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-2.jpg', id: 2, index: 1 },
	],
};
const name = settings?.metadata?.name ?? settings?.name;

describe( 'coblocks/gallery-collage', () => {
	beforeAll( () => {
		// Register the block.
		registerBlock( settings );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name, baseAttributes );
		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should render with images', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( baseAttributes.images[ 0 ].url );
		expect( serializedBlock ).toContain( `data-id="${ baseAttributes.images[ 0 ].id }"` );
		expect( serializedBlock ).toContain( `wp-image-${ baseAttributes.images[ 0 ].id }` );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render image if URL is not defined', () => {
		block.attributes = { ...block.attributes, images: [ { id: 1, index: 0 } ] };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).not.toContain( 'img' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should have className \'has-lightbox\' with lightbox enabled.', () => {
		block.attributes = { ...block.attributes, lightbox: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-lightbox' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should have figcaption element with captions enabled and caption text.', () => {
		block.attributes = {
			...block.attributes,
			images: [
				...block.attributes.images,
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, index: 3, caption: 'test caption' },
			],
			captions: false,
		};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).not.toContain( '<figcaption class="wp-block-coblocks-gallery-collage__caption">' );

		block.attributes.captions = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '<figcaption class="wp-block-coblocks-gallery-collage__caption">' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	[ 'light', 'dark' ].forEach( ( captionStyle ) => {
		it( `should have className \'has-caption-style-${ captionStyle }\' with captionStyle set to '${ captionStyle }'.`, () => {
			block.attributes = {
				...block.attributes,
				images: [
					...block.attributes.images,
					{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, index: 3, caption: 'test caption' },
				],
				captions: true,
				captionStyle,
			};

			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-caption-style-${ captionStyle }` );

			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	[ 'is-style-tiled', 'is-style-layered' ].forEach( ( layoutStyle ) => {
		it( `should have className \'${ layoutStyle }\'.`, () => {
			block.attributes = {
				...block.attributes,
				className: layoutStyle,
			};

			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( layoutStyle );

			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should have custom link when linkTo is set to "custom"', () => {
		block.attributes = {
			...block.attributes,
			images: [
				...block.attributes.images,
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, index: 3, imgLink: 'http://google.com' },
			],
			linkTo: 'custom',
		};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'href="http://google.com"' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should have media link when linkTo is set to "media"', () => {
		block.attributes = {
			...block.attributes,
			images: [
				...block.attributes.images,
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, index: 3 },
			],
			linkTo: 'media',
		};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'href="https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg"' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should have attachment link when linkTo is set to "attachment"', () => {
		block.attributes = {
			...block.attributes,
			images: [
				...block.attributes.images,
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, index: 3, link: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg' },
			],
			linkTo: 'attachment',
		};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'href="https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg"' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	[ 'grayscale', 'sepia', 'saturation', 'dim', 'vintage' ].forEach( ( filter ) => {
		it( `should have className \'has-filter-${ filter }\' with filter set to '${ filter }'.`, () => {
			block.attributes = { ...block.attributes, filter };
			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-filter-${ filter }` );

			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	[ 'small', 'medium', 'large' ].forEach( ( gutter ) => {
		it( `should have className 'has-${ gutter }-gutter' with gutter set to '${ gutter }'.`, () => {
			block.attributes = { ...block.attributes, gutter };

			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-${ gutter }-gutter` );

			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

const baseAttributes = {
	images: [
		{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
		{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-2.jpg', id: 2 },
		{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg' },
	],
};

describe( name, () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name, baseAttributes );
		// Reset the reused variables.
		serializedBlock = '';
	} );

	afterEach( () => {
		// Make a snapshot for each save function test to better detect deprecation needs.
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with images', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( baseAttributes.images[ 0 ].url );
		expect( serializedBlock ).toContain( `data-id="${baseAttributes.images[ 0 ].id}"` );
		expect( serializedBlock ).toContain( `wp-image-${baseAttributes.images[ 0 ].id}` );
	} );

	it( 'should have className \'has-lightbox\' with lightbox enabled.', () => {
		block.attributes = { ...block.attributes, lightbox: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-lightbox' );
	} );

	it( 'should have className \'has-fullwidth-images\' with Fullwidth Images enabled.', () => {
		block.attributes = { ...block.attributes, fullwidth: true };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-fullwidth-images' );
	} );

	it( 'should have figcaption element with captions enabled and caption text.', () => {
		block.attributes = {
			...block.attributes,
			images: [
				...block.attributes.images,
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, caption: 'test caption' },
			],
			captions: false,
		};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).not.toContain( '<figcaption class="coblocks-gallery--caption">' );

		block.attributes.captions = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '<figcaption class="coblocks-gallery--caption">' );
	} );

	[ 'none', 'sml', 'med', 'lrg' ].forEach( ( shadow ) => {
		it( `should have className \'has-shadow-${shadow}\' with box shadow set.`, () => {
			block.attributes = { ...block.attributes, shadow };

			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-shadow-${ shadow }` );
		} );
	} );

	it( 'should have custom link when linkTo is set to "custom"', () => {
		block.attributes = {
				...block.attributes,
				images: [
					...block.attributes.images,
					{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, imgLink: 'http://google.com' },
				],
				linkTo: 'custom',
			};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'href="http://google.com"' );
	} );

	it( 'should have media link when linkTo is set to "media"', () => {
		block.attributes = {
				...block.attributes,
				images: [
					...block.attributes.images,
					{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3 },
				],
				linkTo: 'media',
			};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'href="https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg"' );
	} );

	it( 'should have attachment link when linkTo is set to "attachment"', () => {
		block.attributes = {
				...block.attributes,
				images: [
					...block.attributes.images,
					{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3, link: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg' },
				],
				linkTo: 'attachment',
			};

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'href="https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg"' );
	} );

	[ 'grayscale', 'sepia', 'saturation', 'dim', 'vintage' ].forEach( ( filter ) => {
		it( `should have className \'has-filter-${filter}\' with filter set to '${filter}'.`, () => {
			block.attributes = { ...block.attributes, filter };
			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-filter-${ filter }` );
		} );
	} );
} );
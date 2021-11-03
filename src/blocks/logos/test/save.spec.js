/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';
import { replaceActiveStyle } from '@wordpress/block-editor/build/components/block-styles/utils';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/logos', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	afterEach( () => {
		// Make a snapshot for each save function test to better detect deprecation needs.
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with images attribute', () => {
		block.attributes.images = [
			{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
		];
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg' );
		expect( serializedBlock ).toContain( 'data-id="1"' );
	} );

	it( 'should render content align classes', () => {
		[ 'wide', 'full' ].forEach( alignment => {
			block.attributes.align = alignment;
			block.attributes.images = [
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-2.jpg', id: 2 },
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-3.jpg', id: 3 },
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-4.jpg', id: 4 },
				{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-5.jpg', id: 5 },
			];
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'align' + alignment );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with style "Black & White"', () => {
		block.attributes.className = '';
		block.attributes.images = [
			{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
		];

		const activeStyle = undefined;
		const newStyle = { name: 'black-and-white' };
		block.attributes.className = replaceActiveStyle( block.attributes.className, activeStyle, newStyle );

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'is-style-black-and-white' );
	} );

	it( 'should render with style "Grayscale"', () => {
		block.attributes.className = '';
		block.attributes.images = [
			{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
		];

		const activeStyle = undefined;
		const newStyle = { name: 'grayscale' };
		block.attributes.className = replaceActiveStyle( block.attributes.className, activeStyle, newStyle );

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'is-style-grayscale' );
	} );

	it( 'should render with images.width attribute', () => {
		block.attributes.images = [
			{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1, width: '60.6897%' },
		];
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg' );
		expect( serializedBlock ).toContain( 'data-width="60.6897%"' );
		expect( serializedBlock ).toContain( 'style="width:60.6897%"' );
	} );

	it( 'should render with className attribute', () => {
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"className":"my-custom-class"' );
		expect( serializedBlock ).toContain( 'my-custom-class' );
	} );
} );

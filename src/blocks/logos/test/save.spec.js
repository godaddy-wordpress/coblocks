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

describe( name, () => {
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

	it( 'should render with images attribute', () => {
		block.attributes.images = [
			{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
		];
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg' );
		expect( serializedBlock ).toContain( 'data-id="1"' );
		expect( serializedBlock ).toMatchSnapshot();
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
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with grayscale attribute', () => {
		block.attributes.images = [
			{ url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1 },
		];
		block.attributes.grayscale = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"grayscale":true' );
		expect( serializedBlock ).toContain( 'has-filter-grayscale' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className attribute', () => {
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"className":"my-custom-class"' );
		expect( serializedBlock ).toContain( 'my-custom-class' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

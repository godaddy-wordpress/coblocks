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

describe( 'coblocks/gif', () => {
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

	it( 'should render with url attribute', () => {
		block.attributes.url = 'https://wordpress.com/wp-content/uploads/1234/56/image-1.gif';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'src="https://wordpress.com/wp-content/uploads/1234/56/image-1.gif"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with alt attribute', () => {
		block.attributes.url = 'https://wordpress.com/wp-content/uploads/1234/56/image-1.gif';
		block.attributes.alt = 'alt text';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'src="https://wordpress.com/wp-content/uploads/1234/56/image-1.gif"' );
		expect( serializedBlock ).toContain( 'alt text' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with caption', () => {
		block.attributes.caption = 'Some caption';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '<figcaption>Some caption</figcaption>' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with align attribute', () => {
		const alignOptions = [
			'left', 'center', 'right', 'full', 'wide',
		];
		alignOptions.forEach( ( alignOption ) => {
			block.attributes.url = 'https://wordpress.com/wp-content/uploads/1234/56/image-1.gif';
			block.attributes.align = alignOption;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'src="https://wordpress.com/wp-content/uploads/1234/56/image-1.gif"' );
			expect( serializedBlock ).toContain( `{"align":"${ alignOption }"` );
			expect( serializedBlock ).toContain( `align${ alignOption }` );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

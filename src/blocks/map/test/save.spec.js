/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/map', () => {
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

	it( 'should render with address attribute', () => {
		block.attributes.address = 'New York';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'q=New%20York' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className attribute', () => {
		block.attributes.address = 'New York';
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"className":"my-custom-class"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with height attribute', () => {
		block.attributes.address = 'New York';
		block.attributes.height = 400;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'style="min-height:400px"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with zoom attribute', () => {
		block.attributes.address = 'New York';
		block.attributes.zoom = 15;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"zoom":15' );
		expect( serializedBlock ).toContain( 'z=15' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with iconSize attribute', () => {
		block.attributes.address = 'New York';
		block.attributes.iconSize = 40;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"iconSize":40' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with controls attribute', () => {
		block.attributes.address = 'New York';
		block.attributes.controls = false;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"controls":false' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with hasApiKey attribute', () => {
		block.attributes.address = 'New York';
		block.attributes.hasApiKey = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"hasApiKey":true' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with align attribute', () => {
		const alignOptions = [ 'wide', 'full' ];
		alignOptions.forEach( ( alignOption ) => {
			block.attributes.address = 'New York';
			block.attributes.align = alignOption;
			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `"align":"${ alignOption }"` );
			expect( serializedBlock ).toContain( `align${ alignOption }` );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

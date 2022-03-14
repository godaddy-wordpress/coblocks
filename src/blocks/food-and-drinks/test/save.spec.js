/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/food-and-drinks', () => {
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

	it( 'should render', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render images', () => {
		[ 0, 1 ].forEach( ( renderImageBool ) => {
			block.attributes.showImages = renderImageBool;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( '{"showImages":' + renderImageBool + '}' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render prices', () => {
		[ 0, 1 ].forEach( ( showPricesBool ) => {
			block.attributes.showPrices = showPricesBool;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( '{"showPrices":' + showPricesBool + '}' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render column classes', () => {
		[ 1, 2, 3, 4 ].forEach( ( columnSize ) => {
			block.attributes.columns = columnSize;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'data-columns="' + columnSize + '"' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

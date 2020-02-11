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

	it( 'should render', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render hide images', () => {
		block.attributes.showImages = 0;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{\"showImages\":0}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render hide prices', () => {
		block.attributes.showPrices = 0;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{\"showPrices\":0}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render 3 columns', () => {
		block.attributes.columns = 3;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'data-columns=\"3\"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

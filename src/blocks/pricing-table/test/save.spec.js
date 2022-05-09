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

describe( 'coblocks/pricing-table', () => {
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

	it( 'should render column classes', () => {
		[ 1, 2, 3, 4 ].forEach( ( pricingTableCount ) => {
			block.attributes.count = pricingTableCount;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-' + pricingTableCount + '-columns' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render content align classes', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.contentAlign = alignment;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-text-align-' + alignment );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

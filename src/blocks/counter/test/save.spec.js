/**
 * WordPress dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * External dependencies
 */
import '@testing-library/jest-dom';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

const baseAttributes = {
	counterDescription: 'Always always tested 1000 times',
	counterText: '10000 hours 20000 days',
};

// Counter block uses no innerBlocks.
const baseInnerBlocks = [ ];

describe( 'coblocks/counter', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name, baseAttributes, baseInnerBlocks );
		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should have data attribute \'[data-counter-speed]\' with counterSpeed value.', () => {
		block.attributes = { ...block.attributes, counterSpeed: 5 };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'data-counter-speed=\"5\"' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should have attribute \'counterText\' defined.', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'counterText' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should have attribute \'counterDescription\' defined.', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'counterDescription' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	[ 'left', 'center', 'right' ].forEach( ( align ) => {
		it( `should have className 'has-text-align-${ align }' with align set to '${ align }'.`, () => {
			block.attributes = { ...block.attributes, align };

			serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `has-text-align-${ align }` );

			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

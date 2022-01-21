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

describe( 'coblocks/testimonial', () => {
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

	it( 'should render with content', () => {
		block.attributes.name = 'Some name';
		block.attributes.role = 'Some role';
		block.attributes.text = 'Some text';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some name' );
		expect( serializedBlock ).toContain( 'Some role' );
		expect( serializedBlock ).toContain( 'Some text' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

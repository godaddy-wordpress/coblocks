/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/services', () => {
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
		block.attributes.columns = 3;
		block.attributes.gutter = 'huge';
		block.attributes.alignment = 'center';
		block.attributes.headingLevel = 2;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-3-columns' );
		expect( serializedBlock ).toContain( 'has-huge-gutter' );
		expect( serializedBlock ).toContain( '"alignment":"center"' );
		expect( serializedBlock ).toContain( '"headingLevel":2' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

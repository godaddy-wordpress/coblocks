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

describe( 'coblocks/faq-item', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render', () => {
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with content', () => {
		block.attributes.question = 'Some question';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some question' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render text color', () => {
		block.attributes.question = 'Some question';
		block.attributes.textColor = '#333333';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-333333-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

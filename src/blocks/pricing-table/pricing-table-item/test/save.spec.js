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

	it( 'should render with content', () => {
		block.attributes.title = 'Plan Title';
		block.attributes.amount = '49';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Plan Title' );
		expect( serializedBlock ).toContain( '49' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should render with content', () => {
		block.attributes.title = 'Plan Title';
		block.attributes.features = '- Feature 1';
		block.attributes.currency = '$';
		block.attributes.amount = '49';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Plan Title' );
		expect( serializedBlock ).toContain( '- Feature 1' );
		expect( serializedBlock ).toContain( '$' );
		expect( serializedBlock ).toContain( '49' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

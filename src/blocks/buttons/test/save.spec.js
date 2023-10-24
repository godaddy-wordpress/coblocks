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

describe( 'coblocks/buttons', () => {
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

	it( 'should render up to 4 buttons', () => {
		[ 1, 2, 3, 4 ].forEach( ( items ) => {
			block.attributes.items = items;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( '{"items":' + items + '}' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with isStackedOnMobile enabled', () => {
		block.attributes.isStackedOnMobile = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"isStackedOnMobile":' + true + '}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with contentAlign set', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.contentAlign = alignment;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `flex-align-${ alignment }` );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with custom class name', () => {
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'my-custom-class' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

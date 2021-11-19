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

const DEFAULT_ATTRIBUTES = {
	title: "Some title",
	description: "Some description",
	eventDay: "25",
	eventMonth: "Nov",
	eventYear: "2099",
	eventTime: "5:25",
	eventLocation: "Somewhere",
}

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

	it( 'should render with content', () => {
		block.attributes = DEFAULT_ATTRIBUTES;

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		Object.entries( DEFAULT_ATTRIBUTES ).forEach( ( [key, value] ) => expect( serializedBlock ).toContain( value ) );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render text color', () => {
		block.attributes = DEFAULT_ATTRIBUTES;
		block.attributes.textColor = '#333333';

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-333333-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

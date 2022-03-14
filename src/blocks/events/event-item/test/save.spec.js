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

const DEFAULT_ATTRIBUTES = {
	description: 'Some description',
	eventDay: '25',
	eventLocation: 'Somewhere',
	eventMonth: 'Nov',
	eventTime: '5:25',
	eventYear: '2099',
	title: 'Some title',
};

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
		// Disable reason : value must be the second parameter
		// eslint-disable-next-line no-unused-vars
		Object.entries( DEFAULT_ATTRIBUTES ).forEach( ( [ key, value ] ) => expect( serializedBlock ).toContain( value ) );
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

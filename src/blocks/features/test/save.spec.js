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

	it( 'should render heading h3', () => {
		block.attributes.headingLevel = 3;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{\"headingLevel\":3}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render gutter 3 columns', () => {
		block.attributes.columns = 3;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-3-columns' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render gutter large', () => {
		block.attributes.gutter = 'large';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-large-gutter' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render padding large', () => {
		block.attributes.paddingSize = 'large';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-large-padding' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render margin huge', () => {
		block.attributes.marginSize = 'huge';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-huge-margin' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

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

describe( 'coblocks/dynamic-separator', () => {
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

	it( 'should render with styles', () => {
		[ 'is-style-dots', 'is-style-fullwidth', 'is-style-line' ].forEach( ( styleClass ) => {
			block.attributes.className = styleClass;
			const serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( styleClass );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with height', () => {
		block.attributes.height = '200';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"height":"200"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with color', () => {
		block.attributes.color = 'primary';
		block.attributes.height = null;
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"color":"primary"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customColor', () => {
		block.attributes.customColor = '#da5d5d';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customColor":"#da5d5d"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className', () => {
		block.attributes.className = 'my-custom-class';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"className":"my-custom-class"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

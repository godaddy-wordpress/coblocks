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

describe( 'coblocks/column', () => {
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

	it( 'should render padding classes', () => {
		[ 'none', 'small', 'medium', 'large', 'huge' ].forEach( ( paddingSize ) => {
			block.attributes.paddingSize = paddingSize;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-' + paddingSize + '-padding' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render margin classes', () => {
		[ 'none', 'small', 'medium', 'large', 'huge' ].forEach( ( marginSize ) => {
			block.attributes.marginSize = marginSize;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-' + marginSize + '-margin' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render content align classes', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.contentAlign = alignment;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-text-align-' + alignment );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render text color', () => {
		block.attributes.textColor = '#333333';
		serializedBlock = serialize( block );
		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-333333-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render custom text color', () => {
		block.attributes.customTextColor = '#b4d455';
		serializedBlock = serialize( block );
		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'color:#b4d455' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

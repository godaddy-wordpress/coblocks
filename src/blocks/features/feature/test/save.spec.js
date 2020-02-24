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

	it( 'should render heading levels', () => {
		[ 1, 2, 3, 4, 5, 6 ].forEach( headingLevel => {
			block.attributes.headingLevel = headingLevel;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			if ( 4 !== headingLevel ) {
				expect( serializedBlock ).toContain( '{"headingLevel":' + headingLevel + '}' );
			} else {
				expect( serializedBlock ).not.toContain( '{"headingLevel":' + headingLevel + '}' );
			}
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

	it( 'should render content align classes', () => {
		[ 'left', 'center', 'right' ].forEach( alignment => {
			block.attributes.contentAlign = alignment;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-' + alignment + '-content' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

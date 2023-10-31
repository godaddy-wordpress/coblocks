/**
 * External dependencies
 */
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';
import '@testing-library/jest-dom';

/**
 * Internal dependencies.
 */
import { metadata, name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/highlight', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings, ...metadata } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should render with content', () => {
		block.attributes.content = 'highlighted content';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'highlighted content' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should render with text align', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.align = alignment;
			block.attributes.content = 'highlighted content';
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `text-align:${ alignment }` );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );

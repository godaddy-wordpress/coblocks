/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';
import { layoutOptions } from '../utilities';

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

	it( 'should render column counts', () => {
		[ 1, 2, 3, 4 ].forEach( columnCount => {
			block.attributes.columns = columnCount;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'data-columns="' + columnCount + '"' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render column and layout data', () => {

		// Single column, 100% layout
		block.attributes.columns = 1;
		block.attributes.layout = '100';
		serializedBlock = serialize( block );
		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'data-columns="1"' );
		expect( serializedBlock ).toContain( 'data-layout="100"' );
		expect( serializedBlock ).toMatchSnapshot();

		// Looping through the layoutOptions to match each column + template
		for( var key in layoutOptions ) {
			if ( layoutOptions.hasOwnProperty( key ) ) {

				block.attributes.columns = key;

				for( var ky in layoutOptions[ key ] ) {

					block.attributes.layout = layoutOptions[ key ][ ky ].key;

					serializedBlock = serialize( block );
					expect( serializedBlock ).toBeDefined();
					expect( serializedBlock ).toContain( 'data-columns="' + key + '"' );
					expect( serializedBlock ).toContain( 'data-layout="' + layoutOptions[ key ][ ky ].key + '"' );
					expect( serializedBlock ).toMatchSnapshot();
				}
			}
		}
	} );
} );

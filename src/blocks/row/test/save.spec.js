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

describe( name, () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render column counts', () => {
		[ 1, 2, 3, 4 ].forEach( columnCount => {
			block.attributes.columns = columnCount;
			const serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'data-columns="' + columnCount + '"' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render column and layout data', () => {

		// Single column, 100% layout
		block.attributes.columns = 1;
		block.attributes.layout = '100';
		let serializedBlock = serialize( block );
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

	it( 'should apply custom classes with inline css', () => {
		block.attributes.backgroundColor = '#123456';
		block.attributes.backgroundImg = 'http://background.img';
		block.attributes.backgroundType = 'image';
		block.attributes.focalPoint = { x: 0.1, y: 0.25 };
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toContain( 'has-123456-background-color' );
		expect( serializedBlock ).toContain( `url(${ block.attributes.backgroundImg })` );
		expect( serializedBlock ).toContain( 'background-position:10% 25%' );
	} );
} );

/**
 * External dependencies
 */
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

let block;

describe( name, () => {
	beforeAll( () => {
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		block = createBlock( name );
	} );

	it( 'should render with content', () => {
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );

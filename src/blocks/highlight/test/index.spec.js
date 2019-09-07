/**
 * External dependencies
 */
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe( 'coblocks/highlight', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should render with content', () => {
		const block = createBlock( name, { content: 'highlighted content' } );
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'highlighted content' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		const block = createBlock( name );
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );
} );

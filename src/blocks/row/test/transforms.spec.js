/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

describe( 'coblocks/row transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform when :row prefix is seen', () => {
		const block = helpers.performPrefixTransformation( name, ':row', ':row' );

		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );

	// Should allow transform when prefixed with 2-4 colons.
	for ( let i = 2; i <= 4; i++ ) {
		const prefix = Array( i + 1 ).join( ':' ) + 'row';
		it( `should transform when ${ prefix } prefix is seen`, () => {
			const block = helpers.performPrefixTransformation( name, prefix, prefix );

			expect( block.isValid ).toBe( true );
			expect( block.name ).toBe( name );
			expect( block.attributes.columns ).toBe( i );
		} );
	}
} );

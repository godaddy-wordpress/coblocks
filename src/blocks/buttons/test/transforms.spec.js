/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

describe( 'coblocks/buttons transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	// Should allow transform when prefixed with 1-4 colons.
	for ( let i = 1; i <= 4; i++ ) {
		const prefix = Array( i + 1 ).join( ':' ) + 'buttons';
		it( `should transform when ${ prefix } prefix is seen`, () => {
			const block = helpers.performPrefixTransformation( name, prefix, prefix );

			expect( block.isValid ).toBe( true );
			expect( block.name ).toBe( name );
		} );
	}
} );

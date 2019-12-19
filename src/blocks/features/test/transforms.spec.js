/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

describe( 'coblocks/features transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform when :feature prefix is seen', () => {
		const block = helpers.performPrefixTransformation( name, ':feature', ':feature' );
		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
		expect( block.attributes.columns ).toBe( 1 ); // should be single column.
	} );

	// Should allow transform when prefixed with 1-3 colons.
	for ( let i = 1; i <= 3; i++ ) {
		const prefix = Array( i + 1 ).join( ':' ) + 'features';
		it( `should transform when ${ prefix } prefix is seen`, () => {
			const block = helpers.performPrefixTransformation( name, prefix, prefix );
			expect( block.isValid ).toBe( true );
			expect( block.name ).toBe( name );
			expect( block.attributes.columns ).toBe( Math.max( i, 2 ) ); // should be 2 minimum columns or 3 max.
		} );
	}
} );

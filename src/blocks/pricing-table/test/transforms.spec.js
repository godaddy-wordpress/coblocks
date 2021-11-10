/**
 * External dependencies
 */
import { registerBlockType, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../';

describe( 'coblocks/pricing-table transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	for ( let x = 0; x <= 4; x++ ) {
		it( `should transform raw html to ${ x } column block`, () => {
			const HTML =
			`<div class="wp-block-coblocks-pricing-table ${ ( x > 0 ) && `has-${ x }-columns` } has-text-align-center"><div class="wp-block-coblocks-pricing-table__inner"></div><div class="wp-block-coblocks-pricing-table__inner"></div><div class="wp-block-coblocks-pricing-table__inner"></div></div></div>`;

			const block = rawHandler( { HTML } );

			expect( block[ 0 ].isValid ).toBe( true );
			expect( block[ 0 ].name ).toBe( name );
			expect( block[ 0 ].attributes.count ).toBe( ( x > 0 ) ? x : 2 );
		} );
	}

	it( 'should transform when ":pricing" prefix is seen', () => {
		const prefix = ':pricing';
		const block = helpers.performPrefixTransformation( name, prefix, prefix );
		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );
} );

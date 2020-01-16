/**
 * External dependencies
 */
import { registerBlockType, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';

import { name, settings } from '../index';

describe( 'coblocks/gist transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform raw html to block', () => {
		const file = '#file-gistblocktest-text';
		const HTML = 'https://gist.github.com/AnthonyLedesma/7d0352e8bc50a8a009c2b930f23d110d' + file;

		const block = rawHandler( { HTML } );

		expect( block[ 0 ].isValid ).toBe( true );
		expect( block[ 0 ].attributes.url ).toBe( HTML );
		expect( block[ 0 ].attributes.file ).toBe( file.replace( '-', '.' ) );
		expect( block[ 0 ].name ).toBe( name );
	} );

	it( 'should transform when ":gist" prefix is seen', () => {
		const prefix = ':gist';
		const block = helpers.performPrefixTransformation( name, prefix, prefix );
		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );
} );

/**
 * External dependencies
 */
import { registerBlockType, rawHandler } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import { name, settings } from '../index';

describe( 'coblocks/events transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings, attributes: metadata.attributes } );
	} );

	it( 'should transform raw html to block', () => {
		const HTML = `<p>https://www.godaddy.com/something.ics</p>`;

		const block = rawHandler( { HTML } );

		expect( block[ 0 ].isValid ).toBe( true );
		expect( block[ 0 ].name ).toBe( name );
	} );
} );

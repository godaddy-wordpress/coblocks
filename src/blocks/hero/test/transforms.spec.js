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

describe( 'coblocks/hero transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform when :hero prefix is seen', () => {
		const prefix = ':hero';
		const block = helpers.performPrefixTransformation( name, prefix, prefix );

		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );
} );

/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';
import { name as dynamicSeparatorName, settings as dynamicSeparatorSettings } from '../../dynamic-separator/';

describe( 'coblocks/shape-divider transforms', () => {
	// Shared attributes
	const attributes = {
		height: 200,
	};

	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/spacer block', () => {
		const coreSpacer = createBlock( 'core/spacer', attributes );
		const transformed = switchToBlockType( coreSpacer, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
		expect( transformed[ 0 ].attributes.height ).toBe( attributes.height );
	} );

	it( 'should transform from core/separator block', () => {
		const coreSeparator = createBlock( 'core/separator', attributes );
		const transformed = switchToBlockType( coreSeparator, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );

	it( 'should transform from coblocks/dynamic-separator block', () => {
		registerBlockType( dynamicSeparatorName, { category: 'common', ...dynamicSeparatorSettings } );

		const coblocksDynamicSeparator = createBlock( 'coblocks/dynamic-separator', attributes );
		const transformed = switchToBlockType( coblocksDynamicSeparator, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
		expect( transformed[ 0 ].attributes.height ).toBe( attributes.height );
	} );

	it( 'should transform when :divider prefix is seen', () => {
		const block = helpers.performPrefixTransformation( name, ':divider', ':divider' );

		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );
} );

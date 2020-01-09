/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe( 'coblocks/dynamic-separator transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/spacer block', () => {
		const coreSpacer = createBlock( 'core/spacer', { height: 200 } );
		const transformed = switchToBlockType( coreSpacer, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.height ).toBe( 200 );
	} );

	it( 'should transform from core/separator block', () => {
		const coreSeparator = createBlock( 'core/separator' );

		const transformed = switchToBlockType( coreSeparator, name );
		expect( transformed[ 0 ].isValid ).toBe( true );
	} );

	it( 'should transform to core/spacer block', () => {
		const block = createBlock( name, { height: 200 } );
		const transformed = switchToBlockType( block, 'core/spacer' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.height ).toBe( 200 );
	} );

	it( 'should transform to core/separator block', () => {
		const block = createBlock( name );
		const transformed = switchToBlockType( block, 'core/separator' );

		expect( transformed[ 0 ].isValid ).toBe( true );
	} );
} );

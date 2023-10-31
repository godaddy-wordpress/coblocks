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

describe( 'coblocks/social transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform to core/social-links block', () => {
		const block = createBlock( name );
		const transformed = switchToBlockType( block, 'core/social-links' );

		expect( transformed[ 0 ].isValid ).toBe( true );
	} );

	it( 'should transform to core/social-links block with correct values', () => {
		const block = createBlock( name, {
			className: 'is-style-mask',
			textColor: 'cyan-bluish-gray',
			backgroundColor: 'black',
		} );
		const transformed = switchToBlockType( block, 'core/social-links' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.className ).toBe( 'is-style-logos-only' );
		// expect( transformed[ 0 ].attributes ).toBe( '#abb8c3' );
	} );
} );

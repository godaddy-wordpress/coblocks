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

describe( 'coblocks/click-to-tweet transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/paragraph block', () => {
		const coreParagraph = createBlock( 'core/paragraph', { content: 'paragraph content' } );
		const transformed = switchToBlockType( coreParagraph, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'paragraph content' );
	} );

	it( 'should transform from core/pullquote block', () => {
		const corePullquote = createBlock( 'core/pullquote', { value: 'pullquote content', citation: 'citation content' } );
		const transformed = switchToBlockType( corePullquote, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'pullquote content' + 'citation content' );
	} );

	it( 'should transform from core/quote block', () => {
		const coreQuote = createBlock( 'core/quote', { value: 'quote content', citation: 'citation content' } );
		const transformed = switchToBlockType( coreQuote, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'quote content' + 'citation content' );
	} );

	it( 'should transform to core/paragraph block', () => {
		const block = createBlock( name, { content: 'paragraph content' } );
		const transformed = switchToBlockType( block, 'core/paragraph' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'paragraph content' );
	} );

	it( 'should transform to core/pullquote block', () => {
		const block = createBlock( name, { content: 'pullquote content' } );
		const transformed = switchToBlockType( block, 'core/pullquote' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.value ).toBe( '<p>pullquote content</p>' );
	} );

	it( 'should transform to core/quote block', () => {
		const block = createBlock( name, { content: 'quote content' } );
		const transformed = switchToBlockType( block, 'core/quote' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.value ).toBe( '<p>quote content</p>' );
	} );
} );

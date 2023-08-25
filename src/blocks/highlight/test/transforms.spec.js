/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType, rawHandler } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

describe( 'coblocks/highlight transforms', () => {
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

	it( 'should transform to core/paragraph block', () => {
		const block = createBlock( name, { content: 'paragraph content' } );
		const transformed = switchToBlockType( block, 'core/paragraph' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'paragraph content' );
	} );

	it( 'should transform to core/paragraph block without content', () => {
		const block = createBlock( name, { } );
		const transformed = switchToBlockType( block, 'core/paragraph' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( '' );
	} );

	it( 'should transform when :highlight prefix is seen', () => {
		const prefix = ':highlight';
		const content = 'Lorem ipsum dolor sit amet.';
		const block = helpers.performPrefixTransformation( name, prefix, prefix.concat( ' ', content ) );

		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
		expect( block.attributes.content ).toBe( content );
	} );

	// This test is failing due to removal of raw transforms.
	// The raw transforms no longer process the given HTML as expected.
	it.skip( 'should transform raw html to block', () => {
		const content = 'Lorem <strong>ipsum</strong> dolor sit amet.';
		const HTML = `<p class="wp-block-coblocks-highlight"><mark>${ content }</mark></p>`;

		const block = rawHandler( { HTML } );

		expect( block[ 0 ].isValid ).toBe( true );
		expect( block[ 0 ].name ).toBe( name );
		expect( block[ 0 ].attributes.content ).toBe( content );
	} );
} );

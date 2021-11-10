/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType, rawHandler } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe( 'coblocks/alert transforms', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/paragraph block', () => {
		const coreParagraph = createBlock( 'core/paragraph', { content: 'paragraph content' } );
		const transformed = switchToBlockType( coreParagraph, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.value ).toBe( 'paragraph content' );
	} );

	it( 'should transform to core/paragraph block', () => {
		const block = createBlock( name, { value: 'paragraph content' } );
		const transformed = switchToBlockType( block, 'core/paragraph' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'paragraph content' );
	} );

	it( 'should transform to core/paragraph block and split title', () => {
		const block = createBlock( name, { value: 'paragraph content', title: 'title content' } );
		const transformed = switchToBlockType( block, 'core/paragraph' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( 'title content<br />paragraph content' );
	} );

	it( 'should transform to core/paragraph block without content', () => {
		const block = createBlock( name, { } );
		const transformed = switchToBlockType( block, 'core/paragraph' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].attributes.content ).toBe( '' );
	} );

	it( 'should transform raw html to block', () => {
		const title = 'title';
		const value = 'value';

		const HTML =
			`<div class="wp-block-coblocks-alert">
				<p class="wp-block-coblocks-alert__title">${ title }</p>
				<p class="wp-block-coblocks-alert__text">${ value }</p>
			</div>`;

		const block = rawHandler( { HTML } );

		expect( block[ 0 ].isValid ).toBe( true );
		expect( block[ 0 ].name ).toBe( name );
		expect( block[ 0 ].attributes.value ).toBe( value );
		expect( block[ 0 ].attributes.title ).toBe( title );
	} );
} );

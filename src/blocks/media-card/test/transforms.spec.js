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

describe( 'coblocks/media-card transforms', () => {
	// Shared attributes
	const attributes = {
		mediaAlt: 'Alt Text',
		mediaUrl: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg',
		mediaId: 0,
		mediaPosition: 'left',
		mediaType: 'image',
	};

	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/image block', () => {
		const coreImage = createBlock( 'core/image', { id: attributes.mediaId, url: attributes.mediaUrl, alt: attributes.mediaAlt } );
		const transformed = switchToBlockType( coreImage, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.mediaUrl ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.mediaId ).toBe( attributes.mediaId );
		expect( transformed[ 0 ].attributes.mediaAlt ).toBe( attributes.mediaAlt );
	} );

	it( 'should transform from core/video block', () => {
		const coreImage = createBlock( 'core/video', { id: attributes.mediaId, src: attributes.mediaUrl } );
		const transformed = switchToBlockType( coreImage, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.mediaUrl ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.mediaId ).toBe( attributes.mediaId );
	} );

	it( 'should transform from core/media-text block', () => {
		const coreMediaText = createBlock( 'core/media-text', attributes );
		const transformed = switchToBlockType( coreMediaText, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.mediaAlt ).toBe( attributes.mediaAlt );
		expect( transformed[ 0 ].attributes.mediaUrl ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.mediaType ).toBe( attributes.mediaType );
		expect( transformed[ 0 ].attributes.mediaPosition ).toBe( attributes.mediaPosition );
	} );

	it( 'should transform to core/image block', () => {
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/image' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/image' );

		expect( transformed[ 0 ].attributes.url ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.id ).toBe( attributes.mediaId );
		expect( transformed[ 0 ].attributes.alt ).toBe( attributes.mediaAlt );
	} );

	it( 'should transform to core/video block', () => {
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/video' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/video' );

		expect( transformed[ 0 ].attributes.src ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.id ).toBe( attributes.mediaId );
	} );

	it( 'should transform to core/media-text block', () => {
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/media-text' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/media-text' );

		expect( transformed[ 0 ].attributes.mediaAlt ).toBe( attributes.mediaAlt );
		expect( transformed[ 0 ].attributes.mediaUrl ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.mediaType ).toBe( attributes.mediaType );
		expect( transformed[ 0 ].attributes.mediaPosition ).toBe( attributes.mediaPosition );
	} );

	it( 'should transform when :card prefix is seen', () => {
		const prefix = ':card';
		const block = helpers.performPrefixTransformation( name, prefix, prefix );

		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );
} );

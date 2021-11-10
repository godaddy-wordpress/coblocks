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
import transforms from '../transforms';

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

	it( 'should transform to core/image block', () => {
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/image' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/image' );

		expect( transformed[ 0 ].attributes.url ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.id ).toBe( attributes.mediaId );
		expect( transformed[ 0 ].attributes.alt ).toBe( attributes.mediaAlt );
	} );
	
	it( 'should transform to core/image block only if match', () => {
		expect( transforms.to[ 0 ].isMatch( { mediaType: 'image', mediaUrl: 'someUrl' } ) ).toBe( true );
		expect( transforms.to[ 0 ].isMatch( { mediaType: 'notImage', mediaUrl: 'someUrl' } ) ).toBe( false );
	} );

	it( 'should transform to core/video block', () => {
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/video' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/video' );

		expect( transformed[ 0 ].attributes.src ).toBe( attributes.mediaUrl );
		expect( transformed[ 0 ].attributes.id ).toBe( attributes.mediaId );
	} );
	
	it( 'should transform to core/video block only if match', () => {
		expect( transforms.to[ 1 ].isMatch( { mediaType: 'video', mediaUrl: 'someUrl' } ) ).toBe( true );
		expect( transforms.to[ 1 ].isMatch( { mediaType: 'notVideo', mediaUrl: 'someUrl' } ) ).toBe( false );
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
} );

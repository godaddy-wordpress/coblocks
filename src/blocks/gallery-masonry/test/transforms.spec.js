/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name } from '../index';

describe( 'coblocks/gallery-masonry transforms', () => {
	// Shared attributes used to build transform `from` galleries.
	const sharedAttributes = {
		images: [
			{ id: 0, index: 0, url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg' },
			{ id: 1, index: 1, url: 'https://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
		] };

	const masonryAttributes = {};
	const innerBlocks = [ 
		createBlock( 'core/image', sharedAttributes.images[0], [] ),
		createBlock( 'core/image', sharedAttributes.images[1], [] )
	];

	beforeAll( () => {
		// Register all gallery blocks.
		helpers.registerGalleryBlocks();
	} );

	it( 'should transform from coblocks/gallery-stacked block', () => {
		const galleryStacked = createBlock( 'coblocks/gallery-stacked',	sharedAttributes );
		const transformed = switchToBlockType( galleryStacked, name )[0];

		expect( transformed.isValid ).toBe( true );
		transformed.innerBlocks.forEach( ( image, index ) => {
			expect( image.attributes.id ).toBe( sharedAttributes.images[ index ].id );
			expect( image.attributes.url ).toBe( sharedAttributes.images[ index ].url );
		} );
	} );

	it( 'should transform from coblocks/gallery-collage block', () => {
		const galleryCollage = createBlock( 'coblocks/gallery-collage', sharedAttributes );
		const transformed = switchToBlockType( galleryCollage, name )[0];

		expect( transformed.isValid ).toBe( true );
		transformed.innerBlocks.forEach( ( image, index ) => {
			expect( image.attributes.id ).toBe( sharedAttributes.images[ index ].id );
			expect( image.attributes.url ).toBe( sharedAttributes.images[ index ].url );
		} );
	} );

	it( 'should transform from coblocks/gallery-offset block', () => {
		const galleryOffset = createBlock( 'coblocks/gallery-offset', sharedAttributes );
		const transformed = switchToBlockType( galleryOffset, name )[0];

		expect( transformed.isValid ).toBe( true );
		transformed.innerBlocks.forEach( ( image, index ) => {
			expect( image.attributes.id ).toBe( sharedAttributes.images[ index ].id );
			expect( image.attributes.url ).toBe( sharedAttributes.images[ index ].url );
		} );
	} );

	it( 'should transform from coblocks/gallery-carousel block', () => {
		const galleryCarousel = createBlock( 'coblocks/gallery-carousel', sharedAttributes );
		const transformed = switchToBlockType( galleryCarousel, name )[0];

		expect( transformed.isValid ).toBe( true );
		transformed.innerBlocks.forEach( ( image, index ) => {
			expect( image.attributes.id ).toBe( sharedAttributes.images[ index ].id );
			expect( image.attributes.url ).toBe( sharedAttributes.images[ index ].url );
		} );
	} );

	it( 'should transform from core/gallery block', () => {
		const coreGallery = createBlock( 'core/gallery', { images: sharedAttributes.images } );
		const transformed = switchToBlockType( coreGallery, name )[0];

		expect( transformed.isValid ).toBe( true );
		transformed.innerBlocks.forEach( ( image, index ) => {
			expect( image.attributes.id ).toBe( sharedAttributes.images[ index ].id );
			expect( image.attributes.url ).toBe( sharedAttributes.images[ index ].url );
		} );
	} );

	it( 'should transform from core/image block', () => {
		const coreImage = createBlock( 'core/image', { id:sharedAttributes.images[ 0 ].index, url:sharedAttributes.images[ 0 ].url } );
		const transformed = switchToBlockType( coreImage, name )[0];

		expect( transformed.isValid ).toBe( true );
		expect( transformed.innerBlocks.length ).toBeGreaterThan( 0 );
		
		expect( transformed.innerBlocks[0].attributes.id ).toBe( coreImage.attributes.id );
		expect( transformed.innerBlocks[0].attributes.url ).toBe( coreImage.attributes.url );
	} );

	it( 'should transform from multiple core/image blocks', () => {
		const coreImageBlocks = [
			createBlock( 'core/image', { id: 0, url: 'http://local.domain/image.jpg' } ),
			createBlock( 'core/image', { id: 1, url: 'http://local.domain/image.jpg' } ),
		];
		const transformed = switchToBlockType( coreImageBlocks, name )[0];

		expect( transformed.isValid ).toBe( true );
		expect( transformed.innerBlocks.length ).toBeGreaterThan( 0 );

		transformed.innerBlocks.forEach( ( image, index ) => {
			expect( image.attributes.id ).toBe( coreImageBlocks[ index ].attributes.id );
			expect( image.attributes.url ).toBe( coreImageBlocks[ index ].attributes.url );
		} );
	} );

	it( 'should transform to coblocks/gallery-stacked block', () => {
		const block = createBlock( name, masonryAttributes, innerBlocks );
		const transformed = switchToBlockType( block, 'coblocks/gallery-stacked' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		sharedAttributes.images.forEach( ( image, index ) => {
			expect( transformed[ 0 ].attributes.images[ index ].index ).toBe( index );
			expect( transformed[ 0 ].attributes.images[ index ].url ).toBe( image.url );
		} )
	} );

	it( 'should transform to coblocks/gallery-collage block', () => {
		const block = createBlock( name, masonryAttributes, innerBlocks );
		const transformed = switchToBlockType( block, 'coblocks/gallery-collage' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		sharedAttributes.images.forEach( ( image, index ) => {
			expect( transformed[ 0 ].attributes.images[ index ].index ).toBe( index );
			expect( transformed[ 0 ].attributes.images[ index ].url ).toBe( image.url );
		} )
	} );

	it( 'should transform to coblocks/gallery-offset block', () => {
		const block = createBlock( name, masonryAttributes, innerBlocks );
		const transformed = switchToBlockType( block, 'coblocks/gallery-offset' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		sharedAttributes.images.forEach( ( image, index ) => {
			expect( transformed[ 0 ].attributes.images[ index ].index ).toBe( index );
			expect( transformed[ 0 ].attributes.images[ index ].url ).toBe( image.url );
		} )
	} );

	it( 'should transform to coblocks/gallery-carousel block', () => {
		const block = createBlock( name, masonryAttributes, innerBlocks );
		const transformed = switchToBlockType( block, 'coblocks/gallery-carousel' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		sharedAttributes.images.forEach( ( image, index ) => {
			expect( transformed[ 0 ].attributes.images[ index ].index ).toBe( index );
			expect( transformed[ 0 ].attributes.images[ index ].url ).toBe( image.url );
		} )
	} );

	it( 'should transform to core/gallery block', () => {
		const block = createBlock( name, masonryAttributes, innerBlocks );
		const transformed = switchToBlockType( block, 'core/gallery' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		sharedAttributes.images.forEach( ( image, index ) => {
			expect( transformed[ 0 ].attributes.images[ index ].index ).toBe( index );
			expect( transformed[ 0 ].attributes.images[ index ].url ).toBe( image.url );
		} );
	} );

	it( 'should transform when ":masonry" prefix is seen', () => {
		const prefix = ':masonry';
		const block = helpers.performPrefixTransformation( name, prefix, prefix );
		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
	} );
} );

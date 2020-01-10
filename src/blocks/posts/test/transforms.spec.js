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
import metadata from '../block.json';
import postCarouselMetadata from '../../post-carousel/block.json';
import { name, settings } from '../index';
import { name as postsCarouselBlockName, settings as postsCarouselBlockSettings } from '../../post-carousel/index';

describe( 'coblocks/posts transforms', () => {
	// Shared attributes
	const attributes = {
		align: 'center',
		columns: 3,
		displayPostContent: true,
		displayPostDate: true,
		excerptLength: 55,
		order: 'desc',
		orderBy: 'date',
		postsToShow: 14,
	};

	settings.attributes = metadata.attributes;

	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should transform from core/latest-posts block', () => {
		const coreLatestPosts = createBlock( 'core/latest-posts', attributes );
		const transformed = switchToBlockType( coreLatestPosts, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
		expect( transformed[ 0 ].attributes.order ).toBe( attributes.order );
		expect( transformed[ 0 ].attributes.orderBy ).toBe( attributes.orderBy );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
	} );

	it( 'should transform from coblocks/post-carousel block', () => {
		postsCarouselBlockSettings.attributes = postCarouselMetadata.attributes;
		registerBlockType( postsCarouselBlockName, { category: 'common', ...postsCarouselBlockSettings } );

		const coblocksPostCarousel = createBlock( 'coblocks/post-carousel', attributes );
		const transformed = switchToBlockType( coblocksPostCarousel, name );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
		expect( transformed[ 0 ].attributes.order ).toBe( attributes.order );
		expect( transformed[ 0 ].attributes.orderBy ).toBe( attributes.orderBy );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
		expect( transformed[ 0 ].attributes.columns ).toBe( attributes.columns );
		expect( transformed[ 0 ].attributes.excerptLength ).toBe( attributes.excerptLength );
		expect( transformed[ 0 ].attributes.postsToShow ).toBe( attributes.postsToShow );
		expect( transformed[ 0 ].attributes.displayPostContent ).toBe( attributes.displayPostContent );
		expect( transformed[ 0 ].attributes.displayPostDate ).toBe( attributes.displayPostDate );
	} );

	it( 'should transform to core/latest-posts block', () => {
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/latest-posts' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/latest-posts' );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
	} );
	it( 'should transform when :posts prefix is seen', () => {
		const block = helpers.performPrefixTransformation( name, ':posts', ':posts' );

		expect( block.isValid ).toBe( true );
		expect( block.name ).toBe( name );
		expect( block.attributes.order ).toBe( attributes.order );
		expect( block.attributes.orderBy ).toBe( attributes.orderBy );
	} );

	// Should allow transform when prefixed with 2-6 numerals.
	for ( let i = 2; i <= 6; i++ ) {
		const prefix = ':' + i + 'posts';
		it( `should transform when ${ prefix } prefix is seen`, () => {
			const block = helpers.performPrefixTransformation( name, prefix, prefix );

			expect( block.isValid ).toBe( true );
			expect( block.name ).toBe( name );
			expect( block.attributes.postsToShow ).toBe( i );
			expect( block.attributes.order ).toBe( attributes.order );
			expect( block.attributes.orderBy ).toBe( attributes.orderBy );
		} );
	}
} );

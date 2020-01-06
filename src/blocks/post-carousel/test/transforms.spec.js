/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import postsMetadata from '../../posts/block.json';
import { name, settings } from '../index';
import { name as postsBlockName, settings as postsBlockSettings } from '../../posts/index';

describe( 'coblocks/post-carousel transforms', () => {
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

	it( 'should transform from coblocks/posts block', () => {
		postsBlockSettings.attributes = postsMetadata.attributes;
		registerBlockType( postsBlockName, { category: 'common', ...postsBlockSettings } );

		const coblocksPosts = createBlock( 'coblocks/posts', attributes );
		const transformed = switchToBlockType( coblocksPosts, name );

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
} );


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

	it( 'should transform to core/query block', () => {
		const queryAttributes = {
			...attributes,
		}
		const block = createBlock( name, attributes );
		const transformed = switchToBlockType( block, 'core/query' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/query' );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
	} );

	it( 'should transform to core/rss block', () => {
		const queryAttributes = {
			...attributes,
			externalRssUrl: 'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss',
			postFeedType: 'external',
		}
		const block = createBlock( name, queryAttributes );
		const transformed = switchToBlockType( block, 'core/rss' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( 'core/rss' );
		expect( transformed[ 0 ].attributes.align ).toBe( attributes.align );
		expect( transformed[ 0 ].attributes.feedURL ).toBe( queryAttributes.externalRssUrl );

	} );
} );

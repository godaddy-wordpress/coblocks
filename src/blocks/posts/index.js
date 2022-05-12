/**
 * External dependencies
 */
import { PostsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	category,
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		const { clientId, attributes: { postFeedType } } = props;

		replaceBlocks(
			[ clientId ],
			switchToBlockType( props, postFeedType === 'external' ? 'core/rss' : 'core/query' )
		);

		return null;
	},
	icon,
	save: () => null,
	title: __( 'Posts (CoBlocks)', 'coblocks' ),
	transforms: {
		to: [
			{
				blocks: [ 'core/query' ],
				transform: ( attributes ) => {
					const newAttributes = {
						...( attributes?.align && { align: attributes.align } ),
						displayLayout: {
							columns: attributes.columns ? attributes.columns : 3,
							type: 'flex',
						},
						layout: {
							inherit: true,
						},
						query: {
							...( attributes?.pages && { perPage: attributes.postsToShow.toString() } ),
							...( attributes?.order && { order: attributes.order } ),
							...( attributes?.orderBy && { orderBy: attributes.orderBy } ),
							...( attributes?.categories && { taxQuery: attributes.categories.map( ( cat ) => cat.id ) } ),
							inherit: true,
						},

					};
					// testing the inner blocks - endless spinner
					// const postTitleBlock = createBlock( 'core/post-title', {}, [ ] );
					// const postFeaturedImageBlock = createBlock( 'core/post-featured-image', {}, [ ] );
					// const postPostExcerptBlock = createBlock( 'core/post-excerpt', {}, [ ] );
					// const coreSeparatorBlock = createBlock( 'core/separator', {}, [ ] );
					// const postDateBlock = createBlock( 'core/post-date', {}, [ ] );
					const postTemplate = createBlock( 'core/post-template', {}, [ ] );
					// 	postTitleBlock,
					// 	postFeaturedImageBlock,
					// 	postPostExcerptBlock,
					// 	coreSeparatorBlock,
					// 	postDateBlock,
					// ] );
					const transformedQueryBlock = createBlock( 'core/query', newAttributes, [ postTemplate ] );
					return transformedQueryBlock;
				},
				type: 'block',
			},
			{
				blocks: [ 'core/rss' ],
				transform: ( attributes ) => {
					const rssBlock = createBlock( 'core/rss', {
						align: attributes.align,
						blockLayout: 'grid',
						className: attributes.className,
						columns: attributes.columns,
						displayDate: attributes.displayPostDate,
						displayExcerpt: attributes.displayPostContent,
						excerptLength: attributes.excerptLength,
						feedURL: attributes.externalRssUrl,
						itemsToShow: attributes.postsToShow,
					} );
					return rssBlock;
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

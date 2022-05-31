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
					const hasImageHorizontal = attributes.className?.includes( 'horizontal' );
					let innerBlocks = [];
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
							author: '',
							exclude: [],
							inherit: false,
							offset: 0,
							postType: 'post',
							search: '',
							sticky: '',
						},

					};

					/**
					 * This collection represents horizontal style of the Posts block.
					 */
					if ( hasImageHorizontal ) {
						const featuredImageRight = attributes.listPosition === 'right';
						const isOneColumn = attributes.columns === 1;
						const queryListOrFlex = {
							displayLayout: {
								columns: attributes.columns,
								type: isOneColumn ? 'list' : 'flex',
							},
						};
						const featuredImageColumn = createBlock( 'core/column', { width: '33.33%' }, [
							createBlock( 'core/post-featured-image', { 'is-link': true }, [ ] ),
						] );
						const contentColumn = createBlock( 'core/column', { width: '66.66%' }, [
							createBlock( 'core/post-title', { 'is-link': true }, [ ] ),
							createBlock( 'core/post-date', {}, [ ] ),
							createBlock( 'core/post-excerpt', {}, [ ] ),
						] );

						innerBlocks = [
							createBlock( 'core/post-template', { ...( attributes.align ? { align: attributes.align } : {} ) }, [
								createBlock( 'core/columns', {}, featuredImageRight
									? [ contentColumn, featuredImageColumn ]
									: [ featuredImageColumn, contentColumn ] ),
							] ),

						];
						const transformedQueryBlock = createBlock( 'core/query',
							{ ...newAttributes, ...queryListOrFlex }, innerBlocks );

						return transformedQueryBlock;
					}

					/**
					 * This collection represents stacked style of the Posts block.
					 */
					const postTitleBlock = createBlock( 'core/post-title', { 'is-link': true }, [ ] );
					const postFeaturedImageBlock = createBlock( 'core/post-featured-image', { 'is-link': true }, [ ] );
					const postPostExcerptBlock = createBlock( 'core/post-excerpt', {}, [ ] );
					const coreSeparatorBlock = createBlock( 'core/separator', {}, [ ] );
					const postDateBlock = createBlock( 'core/post-date', {}, [ ] );
					const postTemplate = createBlock( 'core/post-template', { ...( attributes.align ? { align: attributes.align } : {} ) }, [
						postTitleBlock,
						postFeaturedImageBlock,
						postPostExcerptBlock,
						coreSeparatorBlock,
						postDateBlock,
					] );
					const transformedQueryBlock = createBlock( 'core/query', newAttributes, [ postTemplate ] );
					return transformedQueryBlock;
				},
				type: 'block',
			},
			{
				blocks: [ 'core/rss' ],
				transform: ( attributes ) => {
					const isOneColumn = attributes.columns === 1;
					const RSSListOrGrid = {
						blockLayout: isOneColumn ? 'list' : 'grid',
						columns: attributes.columns,
					};
					const rssBlock = createBlock( 'core/rss', {
						align: attributes.align,
						className: attributes.className,
						displayDate: attributes.displayPostDate,
						displayExcerpt: attributes.displayPostContent,
						excerptLength: attributes.excerptLength,
						feedURL: attributes.externalRssUrl,
						itemsToShow: attributes.postsToShow,
						...RSSListOrGrid,
					} );
					return rssBlock;
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

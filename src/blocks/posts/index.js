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
		const { clientId } = props;

		replaceBlocks(
			[ clientId ],
			switchToBlockType( props, 'core/query' )
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
					/**
					 * Structure attributes into query block schema.
					 * 		"query": {
					 *  "type": "object",
					 *  "default": {
					 *  "perPage": null,
					 *  "pages": 0,
					 *  "offset": 0,
					 *  "postType": "post",
					 *  "order": "desc",
					 *  "orderBy": "date",
					 *  "author": "",
					 *  "search": "",
					 *  "exclude": [],
					 *  "sticky": "",
					 *  "inherit": true,
					 *  "taxQuery": null
					 *  }
					 *  },
					 *  "tagName": {
					 *  "type": "string",
					 *  "default": "div"
					 *  },
					 *  "displayLayout": {
					 *  "type": "object",
					 *  "default": {
					 *  "type": "list"
					 *  }
					 *  }
					 *
					 */
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
		],
	},
};

export { name, metadata, settings };

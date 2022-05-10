/**
 * External dependencies
 */
import { PostsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';
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
		const { getBlock } = select( 'core/block-editor' );
		const { clientId } = props;
		console.log( getBlock( clientId ) );
		replaceBlocks(
			[ clientId ],
			switchToBlockType( props, 'core/query' )
		);

		return null;
	},
	save: () => null,
	title: __( 'Posts (CoBlocks)', 'coblocks' ),
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/latest-posts' ],
				transform: ( { displayPostDate, displayPostContent, order, orderBy, categories, postsToShow, excerptLength, align } ) => (
					createBlock( metadata.name, {
						displayPostDate,
						displayPostContent,
						order,
						orderBy,
						categories,
						postsToShow,
						align,
						excerptLength,
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'coblocks/post-carousel' ],
				transform: ( { displayPostDate, displayPostContent, columns, order, orderBy, categories, postsToShow, externalRssUrl, postFeedType, excerptLength, align } ) => (
					createBlock( metadata.name, {
						displayPostDate,
						displayPostContent,
						columns,
						order,
						orderBy,
						categories,
						postsToShow,
						externalRssUrl,
						postFeedType,
						align,
						excerptLength,
					} )
				),
			},
			{
				type: 'prefix',
				prefix: ':posts',
				transform: () => {
					return createBlock( metadata.name );
				},
			},
			...[ 2, 3, 4, 5, 6 ].map( ( postsToShow ) => ( {
				type: 'prefix',
				prefix: `:${ postsToShow }posts`,
				transform: () => {
					return createBlock( metadata.name, {
						postsToShow,
					} );
				},
			} ) ),
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/latest-posts' ],
				transform: ( { displayPostDate, displayPostContent, order, orderBy, categories, postsToShow, excerptLength, align } ) => (
					createBlock( 'core/latest-posts', {
						displayPostDate,
						displayPostContent,
						order,
						orderBy,
						categories,
						postsToShow,
						align,
						excerptLength,
					} )
				),
			},
		],
	},
};

export { name, metadata, settings };

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
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
};

export default transforms;

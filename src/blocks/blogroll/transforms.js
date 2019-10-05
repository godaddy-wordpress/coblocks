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
			type: 'prefix',
			prefix: ':posts',
			transform: function( content ) {
				return createBlock( metadata.name );
			},
		},
		...[ 2, 3, 4, 5, 6 ].map( ( postsToShow ) => ( {
			type: 'prefix',
			prefix: `:${ postsToShow }posts`,
			transform: ( { content } ) => {
				return createBlock( metadata.name, {
					postsToShow,
				} );
			},
		} ) ),
	],
};

export default transforms;

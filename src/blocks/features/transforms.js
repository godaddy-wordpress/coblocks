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
			prefix: ':feature',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
					columns: 1,
				} );
			},
		},
		{
			type: 'prefix',
			prefix: ':features',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
		...[ 2, 3 ].map( ( columns ) => ( {
			type: 'prefix',
			prefix: Array( columns + 1 ).join( ':' ) + 'features',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
					columns,
				} );
			},
		} ) ),
	],
};

export default transforms;

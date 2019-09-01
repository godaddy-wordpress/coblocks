/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'prefix',
			prefix: ':accordion',
			transform: function( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
		...[ 2, 3, 4, 5 ].map( ( count ) => ( {
			type: 'prefix',
			prefix: Array( count + 1 ).join( ':' ) + 'accordion',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
					count,
				} );
			},
		} ) ),
	],
};

export default transforms;

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

/**
 * Internal dependencies
 */
import metadata from './block.json';

const transforms = {
	from: [
		...[ 1, 2, 3, 4 ].map( ( items ) => ( {
			type: 'prefix',
			prefix: Array( items + 1 ).join( ':' ) + 'buttons',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
					items,
				} );
			},
		} ) ),
	],
};

export default transforms;

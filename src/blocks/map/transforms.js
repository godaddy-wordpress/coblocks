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
			prefix: ':map',
			transform: function( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
	],
};

export default transforms;

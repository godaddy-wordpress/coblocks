/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

/**
 * Internal dependencies
 */
import name from './';

const transforms = {
	from: [
		{
			type: 'prefix',
			prefix: ':hero',
			transform: function( content ) {
				return createBlock( `coblocks/${ name }`, {
					content,
				} );
			},
		},
	],
};

export default transforms;

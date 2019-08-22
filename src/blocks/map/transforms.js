/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

import name from './';

const transforms = {
	from: [
		{
			type: 'prefix',
			prefix: ':map',
			transform: function( content ) {
				return createBlock( `coblocks/${ name }`, {
					content,
				} );
			},
		},
	],
};

export default transforms;

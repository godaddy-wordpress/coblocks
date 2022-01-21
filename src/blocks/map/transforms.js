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
			prefix: ':map',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
			type: 'prefix',
		},
	],
};

export default transforms;

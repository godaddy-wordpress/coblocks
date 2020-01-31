/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock, getBlockAttributes } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'raw',
			selector: '.wp-block-coblocks-author',
			transform( node ) {
				return createBlock( metadata.name, {
					...getBlockAttributes( metadata.name, node.outerHTML ),
				} );
			},
		},
		{
			type: 'prefix',
			prefix: ':author',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
	],
};

export default transforms;

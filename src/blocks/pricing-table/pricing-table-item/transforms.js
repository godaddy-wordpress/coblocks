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
			selector: '.wp-block-coblocks-pricing-table-item',
			transform( node ) {
				return createBlock( metadata.name, {
					...getBlockAttributes( metadata.name, node.outerHTML ),
				} );
			},
		},
	],
};

export default transforms;

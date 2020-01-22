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
			selector: '.wp-block-coblocks-pricing-table',
			transform( node ) {
				const blockAttributes = getBlockAttributes( metadata.name, node.outerHTML );
				return createBlock( metadata.name, {
					...blockAttributes,
					count: blockAttributes.className ? parseInt( blockAttributes.className.match( /(\d+)/ )[ 0 ] ) : 2,
				} );
			},
		},
		{
			type: 'prefix',
			prefix: ':pricing',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
	],
};

export default transforms;

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
				const classNameNumberParse = blockAttributes?.className.match( /(\d+)/ );
				return createBlock( metadata.name, {
					...blockAttributes,
					count: classNameNumberParse ? parseInt( classNameNumberParse[ 0 ] ) : 2,
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

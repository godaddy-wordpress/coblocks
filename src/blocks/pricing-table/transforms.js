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
			type: 'raw',
			selector: 'div.wp-block-coblocks-pricing-table',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-pricing-table' ],
				},
			},
		},
		{
			type: 'prefix',
			prefix: ':pricing',
			transform: function( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
	],
};

export default transforms;

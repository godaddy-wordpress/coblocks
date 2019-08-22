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
				return createBlock( `coblocks/${ name }`, {
					content,
				} );
			},
		},
	],
};

export default transforms;

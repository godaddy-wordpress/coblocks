/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

/**
 * Internal dependencies
 */
import { name } from './';

const transforms = {
	from: [
		{
			type: 'raw',
			selector: 'div.wp-block-coblocks-author',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-author' ],
				},
			},
		},
		{
			type: 'prefix',
			prefix: ':author',
			transform: function( content ) {
				return createBlock( `coblocks/${ name }`, {
					content,
				} );
			},
		},
	],
};

export default transforms;


/**
 * Internal dependencies
 */
import { name } from './';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'prefix',
			prefix: ':feature',
			transform: function( content ) {
				return createBlock( `coblocks/${ name }`, {
					content,
					columns: 1,
				} );
			},
		},
		{
			type: 'prefix',
			prefix: ':features',
			transform: function( content ) {
				return createBlock( `coblocks/${ name }`, {
					content,
				} );
			},
		},
		...[ 2, 3 ].map( columns => ( {
			type: 'prefix',
			prefix: Array( columns + 1 ).join( ':' ) + 'features',
			transform( content ) {
				return createBlock( `coblocks/${ name }`, {
					content,
					columns,
				} );
			},
		} ) ),
	],
};

export default transforms;

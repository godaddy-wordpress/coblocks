const { createBlock } = wp.blocks;

// import { name } from './';

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'coblocks/social' ],
			transform: ( { value } ) => {
				// transforming an empty social element
				if ( ! value || ! value.length ) {
					return createBlock( 'coblocks/social' );
				}
				// transforming an social element with content
				return createBlock( 'coblocks/social', {
					content: value,
				} );
			},
		},
	],
};

// from: [
// 	{
// 		type: 'block',
// 		blocks: [ `coblocks/${ name }` ],
// 		transform: ( { content } ) => {
// 			return createBlock( `coblocks/${ name }`, {
// 				value: content,
// 			} );
// 		},
// 	},
// 	{
// 		type: 'raw',
// 		selector: 'div.coblocks-social-profiles',
// 		schema: {
// 			div: {
// 				classes: [ 'coblocks-social-profiles' ],
// 			},
// 		},
// 	},
// 	{
// 		type: 'prefix',
// 		prefix: ':social-profiles',
// 		transform: function( content ) {
// 			return createBlock( `coblocks/${ name }`, {
// 				content,
// 			} );
// 		},
// 	},
// ],

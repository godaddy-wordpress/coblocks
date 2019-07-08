const { createBlock } = wp.blocks;

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'coblocks/social' ],
			transform: ( { attributes } ) => {
				console.log( attributes );
				// transforming an empty social element
				// if ( ! value || ! value.length ) {
				// 	return createBlock( 'coblocks/social' );
				// }
				// transforming an social element with content
				return createBlock( 'coblocks/social', {
					content: attributes,
				} );
			},
		},
		{
			type: 'raw',
			selector: 'div.wp-block-coblocks-social-profiles',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-social-profiles' ],
				},
			},
		},
	],
	from: [
		{
			type: 'raw',
			selector: 'div.wp-block-coblocks-social',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-social' ],
				},
			},
		},
		{
			type: 'prefix',
			prefix: ':share',
			transform: function( content ) {
				console.log( content );
				return createBlock( 'coblocks/social-profiles', {
					content,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'coblocks/social' ],
			transform: ( { attributes } ) => {
				console.log( attributes );
				return createBlock( 'coblocks/social-profiles', {
					value: attributes,
				} );
			},
		},
		// {
		// 	type: 'raw',
		// 	selector: 'div.wp-block-coblocks-social-profiles',
		// 	schema: {
		// 		div: {
		// 			classes: [ 'wp-block-coblocks-social-profiles' ],
		// 		},
		// 	},
		// },
	],
};

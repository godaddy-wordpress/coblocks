
/**
 * Internal dependencies
 */
import name from './';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( `coblocks/${ name }`, {
					content,
				} );
			},
		},
		{
			type: 'raw',
			selector: 'div.wp-block-coblocks-highlight',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-highlight' ],
				},
			},
		},
		{
			type: 'prefix',
			prefix: ':highlight',
			transform: function( content ) {
				return createBlock( `coblocks/${ name }`, {
					content,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				// transforming an empty block
				if ( ! content || ! content.length ) {
					return createBlock( 'core/paragraph' );
				}
				// transforming a block with content
				return createBlock( 'core/paragraph', {
					content: content,
				} );
			},
		},
	],
};

export default transforms;

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
		{
			type: 'prefix',
			prefix: ':highlight',
			transform( content ) {
				return createBlock( metadata.name, {
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
					content,
				} );
			},
		},
	],
};

export default transforms;

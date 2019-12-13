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
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( metadata.name, { value: content } );
			},
		},
		{
			type: 'raw',
			selector: '.wp-block-coblocks-alert',
			transform( node ) {
				return createBlock( metadata.name, {
					...getBlockAttributes( metadata.name, node.outerHTML ),
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { value, title } ) => {
				if ( title ) {
					value = title + '<br />' + value;
				}

				if ( ! value || ! value.length ) {
					return createBlock( 'core/paragraph' );
				}
				// transforming an alert element with content
				return createBlock( 'core/paragraph', {
					content: value,
				} );
			},
		},
	],
};

export default transforms;

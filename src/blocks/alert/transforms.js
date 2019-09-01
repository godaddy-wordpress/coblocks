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
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( metadata.name, { value: content } );
			},
		},
		{
			type: 'raw',
			selector: 'div.wp-block-coblocks-alert',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-alert' ],
				},
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

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
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( `coblocks/${ name }`, { value: content } );
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
		{
			type: 'prefix',
			prefix: ':alert',
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
			transform: ( { value } ) => {
				// transforming an empty alert element
				if ( ! value || ! value.length ) {
					return createBlock( 'core/paragraph' );
				}
				// transforming an alert element with content
				return ( value || [] ).map( () => createBlock( 'core/paragraph', {
					content: value,
				} ) );
			},
		},
	],
};

export default transforms;

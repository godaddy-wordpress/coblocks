/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Generates a layout based on the :row prefix.
 * The number of ::  the number of columns to input.
 * We fallback to the standard divided column layouts.
 *
 * @param {number} columns The number of columns.
 * @return {string} defaultLayout
 */
function generateLayout( columns ) {
	let defaultLayout;

	switch ( columns ) {
		/* istanbul ignore next */
		default:
		case 2:
			defaultLayout = '50-50';
			break;
		case 3:
			defaultLayout = '33-33-33';
			break;
		case 4:
			defaultLayout = '25-25-25-25';
			break;
	}

	return defaultLayout;
}

const transforms = {
	from: [
		{
			type: 'prefix',
			prefix: ':row',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
		...[ 2, 3, 4 ].map( ( columns ) => ( {
			type: 'prefix',
			prefix: Array( columns + 1 ).join( ':' ) + 'row',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
					columns,
					layout: generateLayout( columns ),
				} );
			},
		} ) ),
	],
};

export default transforms;

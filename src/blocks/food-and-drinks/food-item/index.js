/**
 * Internal dependencies.
 */
import metadata from './block.json';

/**
 * WordPress dependencies.
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Block constants.
 */
const { name, category } = metadata;

const settings = {
	edit: () => null,
	parent: [],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes, innerBlocks ) => {
					console.log( 'food and drink inner item', {
						attributes,
						innerBlocks,
					} );
					return createBlock( 'core/column', {}, [] );
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

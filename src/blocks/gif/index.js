/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit,
	parent: [],
	save: () => null,
	title: 'Gif',
	transforms: {
		to: [
			{
				blocks: [ 'core/image' ],
				transform: ( attributes ) => {
					return createBlock(
						'core/image',
						{ url: attributes.url }
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

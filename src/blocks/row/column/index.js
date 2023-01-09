/**
 * Internal dependencies
 */
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
	edit: () => null,
	parent: [],
	save: () => null,
	/* translators: block name */
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock( 'core/column', attributes, innerBlocks );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

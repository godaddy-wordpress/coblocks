/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit,
	save: () => <InnerBlocks.Content />,
	title: 'Gif',
	transforms: {
		to: [
			{
				blocks: [ 'core/image' ],
				transform: ( attributes ) => {
					return createBlock(
						'core/image',
						{ ...attributes }
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

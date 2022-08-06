/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import BlockEdit from './block-edit';
import metadata from './block.json';

const settings = {
	edit: BlockEdit,
	save: () => (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	),
};

const name = metadata.name;
export { name, metadata, settings };

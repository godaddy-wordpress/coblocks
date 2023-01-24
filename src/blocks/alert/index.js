/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );

		replaceBlocks(
			[ props.clientId ],
			createBlock( 'core/paragraph', props.attributes ),
		);
		return null;
	},
	parent: [],
	save: () => null,
	title: metadata.title,
};

export { name, metadata, settings };

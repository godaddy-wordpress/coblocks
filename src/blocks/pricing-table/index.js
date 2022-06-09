/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );

		const columnsBlock = createBlock( 'core/columns', props, [] );

		replaceBlocks(
			[ props.clientId ],
			columnsBlock
		);

		return null;
	},
	parent: [],
	save: () => null,
	/* translators: block name */
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/row' ],
				transform: ( attributes ) => {
					return createBlock( 'core/row', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { dispatch } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );

		replaceBlocks(
			[ props.clientId ],
			switchToBlockType( props, 'core/cover' )[ 0 ]
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
				blocks: [ 'core/cover' ],
				transform: ( attributes ) => {
					return createBlock( 'core/cover', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

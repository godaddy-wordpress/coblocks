/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: ( { clientId } ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		const { getBlock } = select( 'core/block-editor' );

		replaceBlocks(
			[ clientId ],
			switchToBlockType( getBlock( clientId ), 'core/cover' )
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
				transform: ( attributes, innerBlocks ) => {
					return createBlock( 'core/cover', attributes, innerBlocks );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

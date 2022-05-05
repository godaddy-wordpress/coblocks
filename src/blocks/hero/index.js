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

		const parentBlock = wp.data.select( 'core/editor' ).getBlocksByClientId( props.clientId )[ 0 ];

		const cover = switchToBlockType( props, 'core/cover' );

		cover[ 0 ].innerBlocks = parentBlock.innerBlocks;

		console.log( cover );

		replaceBlocks(
			[ props.clientId ],
			cover
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

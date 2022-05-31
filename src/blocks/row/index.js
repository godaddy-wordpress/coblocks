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
		let columns = switchToBlockType( props, 'core/columns' );

		columns[ 0 ].innerBlocks = parentBlock.innerBlocks;

		replaceBlocks(
			[ props.clientId ],
			columns
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
				blocks: [ 'core/columns' ],
				transform: ( attributes ) => {
					return createBlock( 'core/columns', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

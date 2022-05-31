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
		const mediaCardInnerBlocks = parentBlock.innerBlocks[ 0 ].innerBlocks[ 0 ].innerBlocks;
		const mediaInnerBlocks = [];

		for ( let block of mediaCardInnerBlocks ) {
			mediaInnerBlocks.push( createBlock( block.name, block.attributes ) )
		}

		const cover = switchToBlockType( props, 'core/media-text' );

		cover[ 0 ].innerBlocks = mediaInnerBlocks;

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
				blocks: [ 'core/media-text' ],
				transform: ( attributes ) => {
					return createBlock( 'core/media-text', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

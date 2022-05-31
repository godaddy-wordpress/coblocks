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

		let innerBlocks = [];

		for ( let i = 0; i < parentBlock.innerBlocks.length; i++ ) {
			if ( 'coblocks/column' === parentBlock.innerBlocks[ i ].name ) {
				let columnBlock = createBlock( 'core/column', parentBlock.innerBlocks[ i ].attributes );
				columnBlock.innerBlocks = parentBlock.innerBlocks[ i ].innerBlocks
				innerBlocks.push( columnBlock );
				continue;
			}
			innerBlocks.push( parentBlock.innerBlocks[ i ] );
		}

		columns[ 0 ].innerBlocks = innerBlocks;

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

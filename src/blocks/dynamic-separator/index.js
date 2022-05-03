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

		let height = parseInt( ( props.attributes.height ?? 50 ) / 2 );

		replaceBlocks(
			[ props.clientId ],
			[
				createBlock( 'core/spacer', {
					height: height,
				} ),
				switchToBlockType( props, 'core/separator' )[0],
				createBlock( 'core/spacer', {
					height: height,
				} )
			]
		);

		return null;
	},
	parent: [],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/separator' ],
				transform: ( attributes ) => {
					return createBlock( 'core/separator', attributes );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

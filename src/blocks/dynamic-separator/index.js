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

const calculateLineHeight = ( style, height ) => {
	switch ( style ) {
		case 'is-style-line':
			height = height - 2;
			break;

		case 'is-style-dots':
			height = height - 32;
			break;

		case 'is-style-wide':
			height = height - 1;
			break;
	}

	return parseInt( height / 2 );
};

const settings = {
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );

		const height = calculateLineHeight( props.attributes.className, props.attributes.height ?? 50 );

		replaceBlocks(
			[ props.clientId ],
			[
				createBlock( 'core/spacer', {
					height,
				} ),
				switchToBlockType( props, 'core/separator' )[ 0 ],
				createBlock( 'core/spacer', {
					height,
				} ),
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

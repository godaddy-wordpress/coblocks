/**
 * Internal dependencies
 */
import { BLOCK_VARIATION_GALLERY_STACKED } from '../../block-variations/core/gallery';
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
			switchToBlockType( props, 'core/gallery' )
		);
		return null;
	},
	parent: [],
	save: () => null,
	transforms: {
		to: [
			{
				blocks: [ 'core/gallery' ],
				transform: ( attributes ) => {
					const galleryAttributes = Object.fromEntries(
						Object.entries( attributes ).filter(
							( attribute ) => 'images' !== attribute[ 0 ]
						)
					);
					return createBlock(
						'core/gallery',
						Object.assign( {}, BLOCK_VARIATION_GALLERY_STACKED.attributes, galleryAttributes ),
						attributes.images.map( ( image ) => {
							return createBlock( 'core/image', image );
						} ),
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

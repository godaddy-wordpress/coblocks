/**
 * External dependencies
 */
import { GalleryStackedIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
const { name, category } = metadata;

const settings = {
	attributes: {
		ids: { type: 'array' },
		images: { type: 'array' },
		// linkTo: { type: 'string' },
		// sizeSlug: { type: 'string' },
	},
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
					return createBlock(
						'core/gallery',
						Object.assign( {}, attributes, BLOCK_VARIATION_GALLERY_STACKED.attributes )
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, icon, metadata, settings };

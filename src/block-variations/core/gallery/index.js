/**
 * External dependencies
 */
import {
	GalleryCollageIcon,
	GalleryMasonryIcon,
	GalleryStackedIcon,
} from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

export const BLOCK_VARIATION_GALLERY_STACKED = {
	attributes: {
		className: 'is-style-compact',
		columns: 1,
	},
	description: __( 'stacked gallery', 'coblocks' ),
	icon: GalleryStackedIcon,
	name: 'stacked',
	title: __( 'Stacked (CoBlocks)', 'coblocks' ),
};

export const BLOCK_VARIATION_GALLERY_MASONRY = {
	attributes: {
		className: 'is-style-masonry',
		columns: 3,
	},
	description: __( 'masonry gallery', 'coblocks' ),
	icon: GalleryMasonryIcon,
	name: 'masonry',
	title: __( 'Masonry (CoBlocks)', 'coblocks' ),
};

export const BLOCK_VARIATION_GALLERY_COLLAGE = {
	attributes: {
		className: 'is-style-collage',
		columns: 3,
	},
	description: __( 'collage gallery', 'coblocks' ),
	icon: GalleryCollageIcon,
	name: 'collage',
	title: __( 'Collage (CoBlocks)', 'coblocks' ),
};

[
	BLOCK_VARIATION_GALLERY_STACKED,
	BLOCK_VARIATION_GALLERY_MASONRY,
	BLOCK_VARIATION_GALLERY_COLLAGE,
].forEach( ( variation ) => registerBlockVariation( 'core/gallery', variation ) );

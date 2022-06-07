/**
 * External dependencies
 */
import {
	GalleryCollageIcon,
	GalleryMasonryIcon,
	GalleryOffsetIcon,
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
		columns: 4,
	},
	description: __( 'collage gallery', 'coblocks' ),
	icon: GalleryCollageIcon,
	name: 'collage',
	title: __( 'Collage (CoBlocks)', 'coblocks' ),
};

export const BLOCK_VARIATION_GALLERY_OFFSET = {
	attributes: {
		className: 'is-style-offset',
		columns: 4,
	},
	description: __( 'offset gallery', 'coblocks' ),
	icon: GalleryOffsetIcon,
	name: 'offset',
	title: __( 'Offset (CoBlocks)', 'coblocks' ),
};

[
	BLOCK_VARIATION_GALLERY_STACKED,
	BLOCK_VARIATION_GALLERY_MASONRY,
	BLOCK_VARIATION_GALLERY_COLLAGE,
].forEach( ( variation ) => registerBlockVariation( 'core/gallery', variation ) );

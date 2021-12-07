/* eslint-disable sort-keys */
/* eslint-disable sort-imports */
// Disable reason: V1 files do not require updating.
/**
 * External dependencies
 */
import { GalleryMasonryIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { GalleryAttributes } from '../../../components/block-gallery/shared';
import { hasFormattingCategory } from '../../../utils/block-helpers';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name */
	title: __( 'Masonry', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display multiple images in an organized masonry gallery.', 'coblocks' ),
	category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword */
		__( 'photos', 'coblocks' ),
		/* translators: block keyword */
		__( 'lightbox', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			gridSize: 'lrg',
			gutter: 5,
			images: [
				{ index: 0, url: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg' },
				{ index: 1, url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg' },
				{ index: 2, url: 'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg' },
				{ index: 3, url: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg' },
				{ index: 4, url: 'https://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
			],
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };

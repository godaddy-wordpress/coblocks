/**
 * External dependencies
 */
import { GalleryCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { variations } from './variations';
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { hasFormattingCategory } from '../../utils/block-helpers';

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
	title: __( 'Carousel', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display multiple images in a beautiful carousel gallery.', 'coblocks' ),
	category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	attributes,
	variations,
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword */
		__( 'photos', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		coBlocksSpacing: true,
	},
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };

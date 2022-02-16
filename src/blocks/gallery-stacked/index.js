/**
 * External dependencies
 */
import { GalleryStackedIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	attributes: metadata.attributes,
	category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	deprecated,
	/* translators: block description */
	description: __( 'Display multiple images in a single column stacked gallery.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			fullwidth: false,
			images: [
				{ index: 0, url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg' },
				{ index: 1, url: 'https://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
			],
		},
	},
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
	save,
	supports: {
		align: [ 'wide', 'center', 'left', 'right', 'full' ],
		coblocksSpacing: true,
	},
	/* translators: block name */
	title: __( 'Stacked', 'coblocks' ),
	transforms,
};

export { name, category, icon, metadata, settings };

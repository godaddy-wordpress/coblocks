/**
 * External dependencies
 */
import { GalleryMasonryIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
// import transforms from './transforms';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...metadata.attributes,
};

const settings = {
	attributes,
	edit,
	example: {
		attributes: {
			counterText: '450\nCups of Coffee',
		},
	},
	icon: <Icon icon={ icon } />,
	save,
	/* translators: block name */
	title: __( 'Masonry', 'coblocks' ),
	// transforms,
};

export { name, category, metadata, settings };


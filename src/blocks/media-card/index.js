/**
 * Internal dependencies
 */
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { BackgroundAttributes } from '../../components/background';
import { MediaCardIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
	...BackgroundAttributes,
	...DimensionsAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name */
	title: __( 'Media Card', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add an image or video with an offset card side-by-side.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	supports: {
		align: [ 'wide', 'full' ],
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			align: 'wide',
			mediaType: 'image',
			mediaUrl: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg',
			mediaWidth: 45,
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };

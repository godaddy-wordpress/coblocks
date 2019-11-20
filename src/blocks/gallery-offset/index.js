/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './edit';
import save from './save';
import icons from './../../utils/icons';
import transforms from './transforms';
import metadata from './block.json';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const icon = icons.offset;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

/**
 * Block registration
 */
const settings = {
	/* translators: block name */
	title: __( 'Offset', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display images in an offset stacked grid gallery.', 'coblocks' ),
	keywords: [
		/* translators: block keyword */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword */
		__( 'images', 'coblocks' ),
		/* translators: block keyword */
		__( 'photos', 'coblocks' ) ],
	attributes,
	supports: {
		align: [ 'wide', 'full' ],
	},
	transforms,
	example: {
		attributes: {
			gutter: 10,
			radius: 10,
			images: [
				{ index: 0, url: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg' },
				{ index: 1, url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg' },
				{ index: 2, url: 'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg' },
				{ index: 3, url: 'https://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
			],
		},
	},
	edit,
	save,
};

export { name, category, icon, settings, metadata };

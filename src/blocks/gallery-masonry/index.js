/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Masonry', 'block name', 'coblocks' ),
	description: __( 'Display multiple images in an organized masonry gallery.', 'coblocks' ),
	icon,
	keywords: [ _x( 'gallery', 'block keyword', 'coblocks' ), _x( 'photos', 'block keyword', 'coblocks' ), _x( 'lightbox', 'block keyword', 'coblocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			gridSize: 'xlrg',
			gutter: 5,
			images: [
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-1.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-2.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-3.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-4.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-5.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-6.jpg' },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-7.jpg' },
			],
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, icon, metadata, settings };

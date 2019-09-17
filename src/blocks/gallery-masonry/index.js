/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { BackgroundAttributes } from '../../components/background';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Masonry', 'block name' ),
	description: __( 'Display multiple images in an organized masonry gallery.' ),
	icon,
	keywords: [	_x( 'gallery', 'block keyword' ), _x( 'photos', 'block keyword' )	],
	supports: {
		align: [ 'wide', 'full' ],
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
};

export { name, category, icon, metadata, settings };

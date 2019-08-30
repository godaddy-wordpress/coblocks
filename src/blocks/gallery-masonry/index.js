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
const { __ } = wp.i18n;

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
	title: __( 'Masonry' ),
	description: __( 'Display multiple images in an organized masonry gallery.' ),
	icon,
	keywords: [	__( 'gallery' ), __( 'photos' )	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	example: {
		attributes: {
			gridSize: 'xlrg',
			gutter: 5,
			images: [
				0, { url: '/wp-content/plugins/coblocks/dist/images/examples/masonry-1.jpg' },
				1, { url: '/wp-content/plugins/coblocks/dist/images/examples/masonry-2.jpg' },
				2, { url: '/wp-content/plugins/coblocks/dist/images/examples/masonry-3.jpg' },
				3, { url: '/wp-content/plugins/coblocks/dist/images/examples/masonry-4.jpg' },
				4, { url: '/wp-content/plugins/coblocks/dist/images/examples/masonry-5.jpg' },
			],
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, icon, metadata, settings };

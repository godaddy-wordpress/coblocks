/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
import edit from './edit';
import transforms from './transforms';
import save from './save';
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { BackgroundAttributes } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'gallery-masonry';

const title = __( 'Masonry' );

const icon = icons.masonry;

const keywords = [
	__( 'gallery' ),
	__( 'photos' ),
];

const blockAttributes = {
	...GalleryAttributes,
	...BackgroundAttributes,

	// Block specific attributes.
	gridSize: {
		type: 'string',
		default: 'xlrg',
	},
};

const settings = {

	title: title,

	description: __( 'Display multiple images in an organized masonry gallery.' ),

	category: 'coblocks-galleries',

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };

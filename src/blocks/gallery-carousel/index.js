/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
import edit from './edit';
import transforms from './transforms';
import save from './save';
import { BackgroundAttributes } from '../../components/background';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'gallery-carousel';

const title = __( 'Carousel' );

const icon = icons.carousel;

const keywords = [
	__( 'gallery' ),
	__( 'photos' ),
];

const blockAttributes = {
	...GalleryAttributes,
	...BackgroundAttributes,

	// Override global attributes.
	gutter: {
		type: 'number',
		default: 5,
	},
	gutterMobile: {
		type: 'number',
		default: 5,
	},

	// Block specific attributes.
	gridSize: {
		type: 'string',
		default: 'lrg',
	},
	height: {
		type: 'number',
		default: 400,
	},

	// Slider attributes.
	pageDots: {
		type: 'boolean',
		default: false,
	},
	prevNextButtons: {
		type: 'boolean',
		default: true,
	},
	autoPlay: {
		type: 'boolean',
		default: false,
	},
	autoPlaySpeed: {
		type: 'string',
		default: 3000,
	},
	draggable: {
		type: 'boolean',
		default: true,
	},
};

const settings = {

	title: title,

	description: __( 'Display multiple images in a beautiful carousel gallery.' ),

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

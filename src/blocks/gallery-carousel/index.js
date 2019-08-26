/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import { BackgroundAttributes } from '../../components/background';
import { GalleryAttributes } from '../../components/block-gallery/shared';
import icons from './icons';
import edit from './edit';
import transforms from './transforms';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Carousel' );

const icon = icons.carousel;

const attributes = {
	...GalleryAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {

	title,

	description: __( 'Display multiple images in a beautiful carousel gallery.' ),

	category: 'coblocks-galleries',

	keywords: [	__( 'gallery' ), __( 'photos' )	],

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
import edit from './edit';
import metadata from './block.json';
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
const { name } = metadata;

const title = __( 'Masonry' );

const icon = icons.masonry;

const attributes = {
	...GalleryAttributes,
	...BackgroundAttributes,
	// Block specific attributes.
	...metadata.attributes,
};

const settings = {

	title,

	description: __( 'Display multiple images in an organized masonry gallery.' ),

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

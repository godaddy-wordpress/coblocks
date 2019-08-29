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
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, icon, metadata, settings };

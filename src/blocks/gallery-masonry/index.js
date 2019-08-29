/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import icon from './icon';
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

export { name, metadata, icon, settings };

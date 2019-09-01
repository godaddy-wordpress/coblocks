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
import deprecated from './deprecated';
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
	title: __( 'Carousel' ),
	description: __( 'Display multiple images in a beautiful carousel gallery.' ),
	category: 'coblocks-galleries',
	keywords: [	__( 'gallery' ), __( 'photos' ) ],
	attributes,
	icon,
	supports: {
		align: [ 'wide', 'full' ],
	},
	transforms,
	edit,
	deprecated,
	save,
};

export { name, category, icon, metadata, settings };

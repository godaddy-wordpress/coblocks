/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { BackgroundAttributes } from '../../components/background';
import edit from './edit';
import icon from './icon';
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

const attributes = {
	...GalleryAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title: __( 'Stacked' ),
	description: __( 'Display multiple images in an single column stacked gallery.' ),
	icon,
	keywords: [	__( 'gallery' ), __( 'photos' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, metadata, icon, settings };

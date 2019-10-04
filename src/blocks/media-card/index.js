/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { BackgroundAttributes } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...BackgroundAttributes,
	...DimensionsAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Media Card', 'block name' ),
	description: __( 'Add an image or video with an offset card side-by-side.' ),
	icon,
	keywords: [ _x( 'image', 'block keyword' ), _x( 'video', 'block keyword' ), 'coblocks' ],
	supports: {
		align: [ 'wide', 'full' ],
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			align: 'wide',
			mediaType: 'image',
			mediaUrl: '/wp-content/plugins/coblocks/dist/images/examples/gallery-5.jpg',
			mediaWidth: 65,
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import metadata from './block.json';
import { BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.mediaCard;

const title = __( 'Media Card' );

const attributes = {
	...BackgroundAttributes,
	...DimensionsAttributes,
	...metadata.attributes,
};

const settings = {
	title,

	description: __( 'Add an image or video with an offset card side-by-side.' ),

	keywords: [ __( 'image' ), __( 'video' ), 'coblocks' ],

	supports: {
		align: [ 'wide', 'full' ],
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},

	attributes,

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };

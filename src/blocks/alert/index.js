/**
 * Internal dependencies
 */
import './styles/style.scss';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icons from './../../utils/icons';
import transforms from './transforms';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const icon = icons.alert;

const title = __( 'Alert' );

const settings = {
	title,

	description: __( 'Provide contextual feedback messages.' ),

	keywords: [ __( 'notice' ), __( 'message' ), __( 'coblocks' ) ],

	attributes,

	styles: [
		{ name: 'info', label: _x( 'Info', 'block style' ), isDefault: true },
		{ name: 'success', label: _x( 'Success', 'block style' ) },
		{ name: 'warning', label: _x( 'Warning', 'block style' ) },
		{ name: 'error', label: _x( 'Error', 'block style' ) },
	],

	supports: {
		align: true,
		alignWide: false,
		alignFull: false,
	},

	transforms,

	edit,

	save,

	deprecated,
};

export { name, title, icon, settings, attributes };

/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';
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

const settings = {
	title: __( 'Alert' ),
	description: __( 'Provide contextual feedback messages.' ),
	icon,
	keywords: [ __( 'notice' ), __( 'message' ), 'coblocks' ],
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
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, settings, attributes };

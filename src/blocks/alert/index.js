/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

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
	example: {
		attributes: {
			title: __( 'This is an alert block' ),
			value: __( 'An alert is a message that displays outside the flow of typical content. Alerts provide contextual feedback, typically asking readers to take an action.' ),
		},
	},
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

export { name, category, metadata, settings, attributes };

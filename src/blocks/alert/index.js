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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Alert', 'block name', 'coblocks' ),
	description: __( 'Provide contextual feedback messages or notices.', 'coblocks' ),
	icon,
	keywords: [ _x( 'notice', 'block keyword', 'coblocks' ), _x( 'message', 'block keyword', 'coblocks' ), 'coblocks' ],
	styles: [
		{ name: 'info', label: _x( 'Info', 'block style', 'coblocks' ), isDefault: true },
		{ name: 'success', label: _x( 'Success', 'block style', 'coblocks' ) },
		{ name: 'warning', label: _x( 'Warning', 'block style', 'coblocks' ) },
		{ name: 'error', label: _x( 'Error', 'block style', 'coblocks' ) },
	],
	supports: {
		align: true,
		alignWide: false,
		alignFull: false,
	},
	example: {
		attributes: {
			title: __( 'This is an alert block', 'coblocks' ),
			value: __( 'An alert is a message that displays outside the flow of typical content. Alerts provide contextual feedback, typically asking readers to take an action.', 'coblocks' ),
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings, attributes };

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
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Alert', 'coblocks' ),
	description: __( 'Provide contextual feedback messages or notices.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'notice', 'coblocks' ),
		/* translators: block keyword */
		__( 'message', 'coblocks' ),
		'coblocks' ],
	styles: [
		{ name: 'info', label: /* translators: block style */ __( 'Info', 'coblocks' ), isDefault: true },
		{ name: 'success', label: /* translators: block style */ __( 'Success', 'coblocks' ) },
		{ name: 'warning', label: /* translators: block style */ __( 'Warning', 'coblocks' ) },
		{ name: 'error', label: /* translators: block style */ __( 'Error', 'coblocks' ) },
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

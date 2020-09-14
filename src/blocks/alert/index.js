/**
 * External dependencies
 */
import { AlertIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Alert', 'coblocks' ),
	/* translators: block description */
	description: __( 'Provide contextual feedback messages or notices.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'notice', 'coblocks' ),
		/* translators: block keyword */
		__( 'message', 'coblocks' ),
	],
	styles: [
		{
			name: 'info',
			/* translators: block style */
			label: __( 'Info', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'success',
			/* translators: block style */
			label: __( 'Success', 'coblocks' ),
		},
		{
			name: 'warning',
			/* translators: block style */
			label: __( 'Warning', 'coblocks' ),
		},
		{
			name: 'error',
			/* translators: block style */
			label: __( 'Error', 'coblocks' ),
		},
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

/**
 * External dependencies
 */
import { FormSubmitIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-submit-button',
	category: 'layout',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Submit', 'coblocks' ),
		},
		required: {
			type: 'boolean',
			default: true,
		},
		submitButtonText: {
			type: 'string',
			default: __( 'Submit', 'coblocks' ),
		},
		customBackgroundButtonColor: {
			type: 'string',
		},
		customTextButtonColor: {
			type: 'string',
		},
		submitButtonClasses: {
			type: 'string',
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	attributes,
	description: __( 'A button for submitting form data.', 'coblocks' ),
	edit,

	/* translators: block description */
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'submit', 'coblocks' ),
		/* translators: block keyword */
		__( 'button', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	save: () => null,
	styles: [
		{ isDefault: true, label: __( 'Fill', 'coblocks' ), name: 'fill' },
		{ label: __( 'Outline', 'coblocks' ), name: 'outline' },
		{ label: __( 'Circular', 'coblocks' ), name: 'circular' },
		{ label: __( '3D', 'coblocks' ), name: '3d' },
		{ label: __( 'Shadow', 'coblocks' ), name: 'shadow' },
	],
	supports: {
		customClassName: true,
		html: false,
		multiple: false,
		reusable: false,
	},
	/* translators: block name */
	title: __( 'Submit', 'coblocks' ),
};

export { name, category, metadata, settings };

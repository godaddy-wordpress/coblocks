/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
	/* translators: block name */
	title: __( 'Submit', 'coblocks' ),
	/* translators: block description */
	description: __( 'A button for submitting form data.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'submit', 'coblocks' ),
		/* translators: block keyword */
		__( 'button', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		multiple: false,
		customClassName: true,
	},
	styles: [
		{ name: 'fill', label: __( 'Fill' ), isDefault: true },
		{ name: 'outline', label: __( 'Outline' ) },
		{ name: 'circular', label: __( 'Circular' ) },
		{ name: '3d', label: __( '3D' ) },
		{ name: 'shadow', label: __( 'Shadow' ) },
	],
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

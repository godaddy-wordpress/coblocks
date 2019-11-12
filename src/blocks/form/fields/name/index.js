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
	name: 'coblocks/field-name',
	category: 'coblocks',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Name', 'coblocks' ),
		},
		required: {
			type: 'boolean',
			default: false,
		},
		hasLastName: {
			type: 'boolean',
			default: false,
		},
		labelFirstName: {
			type: 'string',
			default: __( 'First', 'coblocks' ),
		},
		labelLastName: {
			type: 'string',
			default: __( 'Last', 'coblocks' ),
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Name', 'coblocks' ),
	/* translators: block description */
	description: __( 'A text field for collecting the first and last names.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'email', 'coblocks' ),
		/* translators: block keyword */
		__( 'first name', 'coblocks' ),
		/* translators: block keyword */
		__( 'last name', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

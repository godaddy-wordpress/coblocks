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
	name: 'coblocks/field-phone',
	category: 'coblocks',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Phone', 'coblocks' ),
		},
		required: {
			type: 'boolean',
			default: false,
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Phone', 'coblocks' ),
	/* translators: block description */
	description: __( 'A phone number to allow visitors to give you a phone number.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'telephone', 'coblocks' ),
		/* translators: block keyword */
		__( 'cellular', 'coblocks' ),
		/* translators: block keyword */
		__( 'cell', 'coblocks' ),
		/* translators: block keyword */
		__( 'mobile', 'coblocks' ),
		/* translators: block keyword */
		__( 'fax', 'coblocks' ),
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

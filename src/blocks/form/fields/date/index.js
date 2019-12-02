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
	name: 'coblocks/field-date',
	category: 'coblocks',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Date', 'coblocks' ),
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
	title: __( 'Date', 'coblocks' ),
	/* translators: block description */
	description: __( 'A field for requesting date selections with a date picker.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'calendar', 'coblocks' ),
		/* translators: block keyword */
		__( 'day', 'coblocks' ),
		/* translators: block keyword */
		__( 'month', 'coblocks' ),
		/* translators: block keyword */
		__( 'year', 'coblocks' ),
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

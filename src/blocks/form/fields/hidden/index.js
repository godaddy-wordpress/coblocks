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
	name: 'coblocks/field-hidden',
	category: 'coblocks',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Hidden', 'coblocks' ),
		},
		value: {
			type: 'string',
			default: '',
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Hidden', 'coblocks' ),
	/* translators: block description */
	description: __( 'A hidden text field for collecting additional data.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'input', 'coblocks' ),
		/* translators: block keyword */
		__( 'text', 'coblocks' ),
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

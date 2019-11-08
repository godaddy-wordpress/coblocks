/**
 * Internal dependencies
 */
import { editMultiField } from '../helpers';
import icon from './icon';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-checkbox',
	category: 'coblocks',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Checkbox', 'coblocks' ),
		},
		required: {
			type: 'boolean',
			default: false,
		},
		options: {
			type: 'array',
			default: [],
		},
		isInline: {
			type: 'boolean',
			default: false,
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Checkbox', 'block name', 'coblocks' ),
	keywords: [ _x( 'option', 'block keyword', 'coblocks' ) ],
	description: __( 'A checkbox field with multiple options where multiple choices can be made.', 'coblocks' ),
	icon,
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	edit: editMultiField( 'checkbox' ),
	save: () => null,
};

export { name, category, metadata, settings };

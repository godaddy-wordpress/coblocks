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
	name: 'coblocks/field-select',
	category: 'coblocks',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Select', 'coblocks' ),
		},
		required: {
			type: 'boolean',
			default: false,
		},
		options: {
			type: 'array',
			default: [],
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Select', 'block name', 'coblocks' ),
	keywords: [ _x( 'dropdown', 'block keyword', 'coblocks' ), _x( 'option', 'block keyword', 'coblocks' ) ],
	description: __( 'A dropdown field with multiple options where only one choice can be made.', 'coblocks' ),
	icon,
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	edit: editMultiField( 'select' ),
	save: () => null,
};

export { name, category, metadata, settings };

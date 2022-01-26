/**
 * External dependencies
 */
import { FormCheckboxIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { editMultiField } from '../helpers';
import { getBlockIconColor } from '../../../../utils/helper';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-checkbox',
	category: 'layout',
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
	/* translators: block name */
	title: __( 'Checkbox', 'coblocks' ),
	/* translators: block description */
	description: __( 'A checkbox field with multiple options where multiple choices can be made.', 'coblocks' ),
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'option', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
		labelColor: true,
	},
	attributes,
	transforms,
	edit: editMultiField( 'checkbox' ),
	save: () => null,
};

export { name, category, metadata, settings };

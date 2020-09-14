/**
 * Internal dependencies
 */
import edit from './edit';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { FormTextIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-text',
	category: 'layout',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Text', 'coblocks' ),
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
	title: __( 'Text', 'coblocks' ),
	/* translators: block description */
	description: __( 'A text box for custom responses.', 'coblocks' ),
	icon: <Icon icon={ FormTextIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'text control', 'coblocks' ),
		/* translators: block keyword */
		__( 'text box', 'coblocks' ),
		/* translators: block keyword */
		__( 'input', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	transforms,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

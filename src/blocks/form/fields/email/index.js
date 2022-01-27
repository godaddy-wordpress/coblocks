/**
 * External dependencies
 */
import { FormEmailIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import { getBlockIconColor } from '../../../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-email',
	category: 'layout',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Email', 'coblocks' ),
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
	title: __( 'Email', 'coblocks' ),
	/* translators: block description */
	description: __( 'A field for collecting a validated email address.', 'coblocks' ),
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'e-mail', 'coblocks' ),
		/* translators: block keyword */
		__( 'mail', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		multiple: false,
		customClassName: false,
		labelColor: true,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

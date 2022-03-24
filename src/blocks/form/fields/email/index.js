/**
 * External dependencies
 */
import { FormEmailIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Email', 'coblocks' ),
	/* translators: block description */
	description: __( 'A field for collecting a validated email address.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
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

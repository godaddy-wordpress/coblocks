/**
 * External dependencies
 */
import { FormNameIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

const { name, category, attributes } = metadata;

const settings = {
	attributes,
	/* translators: block description */
	description: __( 'A text field for collecting the first and last names.', 'coblocks' ),
	edit,
	icon: <Icon icon={ icon } />,
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
	save: () => null,
	supports: {
		customClassName: false,
		html: false,
		labelColor: true,
		reusable: false,
	},
	/* translators: block name */
	title: __( 'Name', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };

/**
 * External dependencies
 */
import { FormTextareaIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
	/* translators: block name */
	title: __( 'Textarea', 'coblocks' ),
	/* translators: block description */
	description: __( 'A text box for longer responses.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'text', 'coblocks' ),
		/* translators: block keyword */
		__( 'message text', 'coblocks' ),
		/* translators: block keyword */
		__( 'multiline text', 'coblocks' ),
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
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

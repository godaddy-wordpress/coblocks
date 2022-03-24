/* global coblocksBlockData */

/**
 * External dependencies
 */
import { FormIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import variations from './variations';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';

const { name, category, attributes } = metadata;
let conditionalBlockAttributes = { ...attributes };
if ( typeof coblocksBlockData !== 'undefined' ) {
	conditionalBlockAttributes = {
		...conditionalBlockAttributes,
		subject: {
			default: coblocksBlockData.form.emailSubject,
			type: 'string',
		},
		successText: {
			default: coblocksBlockData.form.successText,
			type: 'string',
		},
		to: {
			default: coblocksBlockData.form.adminEmail,
			type: 'string',
		},
	};
}

const settings = {
	attributes: conditionalBlockAttributes,
	/* translators: block description */
	description: __( 'Add a contact form to your page.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			subject: __( 'Subject example', 'coblocks' ),
		},
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'email', 'coblocks' ),
		/* translators: block keyword */
		__( 'about', 'coblocks' ),
		/* translators: block keyword */
		__( 'contact', 'coblocks' ),
	],
	save: InnerBlocks.Content,
	supports: {
		customClassName: false,
		html: false,
		labelColor: true,
		reusable: false,
	},
	/* translators: block name */
	title: __( 'Form', 'coblocks' ),
	variations,
};

export { name, category, metadata, settings };

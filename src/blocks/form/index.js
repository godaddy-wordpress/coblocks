/* global coblocksBlockData */

/**
 * External dependencies
 */
import { FormIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import variations from './variations';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

// Note: Check that coblocksBlockData is set. So jest tests will pass.
const successTextDefault = typeof coblocksBlockData === 'undefined' ? __( 'Your message was sent:', 'coblocks' ) : coblocksBlockData.form.successText;

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/form',
	category: 'layout',
	attributes: {
		subject: {
			type: 'string',
			default: null,
		},
		to: {
			type: 'string',
			default: null,
		},
		successText: {
			type: 'string',
			default: successTextDefault,
		},
	},
};

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Form', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add a contact form to your page.', 'coblocks' ),
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
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	example: {
		attributes: {
			subject: __( 'Subject example', 'coblocks' ),
		},
	},
	attributes,
	variations,
	edit,
	save: InnerBlocks.Content,
};

export { name, category, metadata, settings };

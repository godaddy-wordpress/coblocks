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
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';

// Note: Check that coblocksBlockData is set. So jest tests will pass.
const successTextDefault = typeof coblocksBlockData === 'undefined' ? __( 'Your message was sent:', 'coblocks' ) : coblocksBlockData.form.successText;

/**
 * Block constants
 */
const metadata = {
	attributes: {
		subject: {
			default: null,
			type: 'string',
		},
		successText: {
			default: successTextDefault,
			type: 'string',
		},
		to: {
			default: null,
			type: 'string',
		},
	},
	category: 'layout',
	name: 'coblocks/form',
};

const { name, category, attributes } = metadata;

const settings = {
	attributes,
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

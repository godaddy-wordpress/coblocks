/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import variations from './variations';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

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
	},
};

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Form', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add a contact form to your page.', 'coblocks' ),
	icon,
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

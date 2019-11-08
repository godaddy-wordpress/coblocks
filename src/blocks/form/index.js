/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';

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
	category: 'coblocks',
	attributes: {
		subject: {
			type: 'string',
			default: null,
		},
		to: {
			type: 'string',
			default: null,
		},
		submitButtonText: {
			type: 'string',
			default: __( 'Submit', 'coblocks' ),
		},
		customBackgroundButtonColor: {
			type: 'string',
		},
		customTextButtonColor: {
			type: 'string',
		},
		submitButtonClasses: {
			type: 'string',
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
	edit,
	save: InnerBlocks.Content,
};

export { name, category, metadata, settings };

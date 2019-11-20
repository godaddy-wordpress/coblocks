/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const metadata = {
	name: 'coblocks/field-website',
	category: 'coblocks',
	attributes: {
		label: {
			type: 'string',
			default: __( 'Website', 'coblocks' ),
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
	title: __( 'Website', 'coblocks' ),
	/* translators: block description */
	description: __( 'A text field for collecting a URL.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'link', 'coblocks' ),
		/* translators: block keyword */
		__( 'hyperlink', 'coblocks' ),
		/* translators: block keyword */
		__( 'url', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

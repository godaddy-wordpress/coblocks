/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name.  */
	title: __( 'Textarea', 'coblocks' ),
	description: __( 'A text box for longer responses.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword.  */
		__( 'text', 'coblocks' ),
    /* translators: block keyword.  */
		__( 'message text', 'coblocks' ) ],
		/* translators: block keyword.  */
		__( 'multiline text', 'coblocks' ) ],
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

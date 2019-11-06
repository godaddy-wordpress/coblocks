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
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name.  */
	title: __( 'Form', 'coblocks' ),
	description: __( 'Add a contact form to your page.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword.  */
		__( 'email', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'about', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'contact', 'coblocks' ) ],
	supports: {
		reusable: false,
		html: false,
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

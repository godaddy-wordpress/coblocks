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
import { __, _x } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Form', 'block name', 'coblocks' ),
	description: __( 'Add a contact form to your page.', 'coblocks' ),
	icon,
	keywords: [ _x( 'email', 'block keyword', 'coblocks' ), _x( 'about', 'block keyword', 'coblocks' ), _x( 'contact', 'block keyword', 'coblocks' ) ],
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

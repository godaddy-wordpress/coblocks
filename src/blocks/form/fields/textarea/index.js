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

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Textarea', 'block name', 'coblocks' ),
	description: __( 'A text box for longer responses.', 'coblocks' ),
	icon,
	keywords: [ _x( 'text', 'block keyword', 'coblocks' ), _x( 'message', 'block keyword', 'coblocks' ), _x( 'multiline', 'block keyword', 'coblocks' ) ],
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

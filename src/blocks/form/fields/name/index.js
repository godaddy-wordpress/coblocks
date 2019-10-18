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
	title: _x( 'Name', 'block name', 'coblocks' ),
	description: __( 'A text field for collecting the first and last names.', 'coblocks' ),
	icon,
	keywords: [ _x( 'first name', 'block keyword', 'coblocks' ), _x( 'last name', 'block keyword', 'coblocks' ), 'email' ],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

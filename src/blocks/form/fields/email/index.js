/**
 * Internal dependencies
 */
import edit from './edit';
import icons from '../../icons';
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
	title: _x( 'Email', 'block name' ),
	description: __( 'An email address field.' ),
	icon: icons.email,
	keywords: [ _x( 'e-mail', 'block keyword' ), _x( 'mail', 'block keyword' ), 'email' ],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

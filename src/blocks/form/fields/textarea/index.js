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
	title: _x( 'Message', 'block name' ),
	description: __( 'A text box for longer responses.' ),
	icon: icons.textarea,
	keywords: [ _x( 'Textarea', 'block keyword' ), 'textarea', _x( 'Multiline text', 'block keyword' ) ],
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

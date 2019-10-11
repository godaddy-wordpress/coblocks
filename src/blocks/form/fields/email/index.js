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
	title: _x( 'Email', 'block name' ),
	description: __( 'A field for collecting a validated email address.' ),
	icon,
	keywords: [ _x( 'e-mail', 'block keyword' ), _x( 'mail', 'block keyword' ) ],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		multiple: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };

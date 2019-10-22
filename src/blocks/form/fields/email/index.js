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
	title: _x( 'Email', 'block name', 'coblocks' ),
	description: __( 'A field for collecting a validated email address.', 'coblocks' ),
	icon,
	keywords: [ _x( 'e-mail', 'block keyword', 'coblocks' ), _x( 'mail', 'block keyword', 'coblocks' ) ],
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

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
	title: _x( 'Website', 'block name', 'coblocks' ),
	description: __( 'A text field for collecting a URL.', 'coblocks' ),
	icon,
	keywords: [ _x( 'Website', 'block keyword', 'coblocks' ), _x( 'URL', 'block keyword', 'coblocks' ), 'text' ],
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

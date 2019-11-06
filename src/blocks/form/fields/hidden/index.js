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
	title: _x( 'Hidden', 'block name', 'coblocks' ),
	description: __( 'A hidden text field for collecting additional data.', 'coblocks' ),
	icon,
	keywords: [ _x( 'input', 'block keyword', 'coblocks' ), _x( 'text', 'block keyword', 'coblocks' ) ],
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

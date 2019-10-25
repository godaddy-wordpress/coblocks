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
	title: _x( 'Date', 'block name', 'coblocks' ),
	keywords: [ _x( 'calendar', 'block keyword', 'coblocks' ), _x( 'day month year', 'block keyword', 'coblocks' ) ],
	description: __( 'A field for requesting date selections with a date picker.', 'coblocks' ),
	icon,
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

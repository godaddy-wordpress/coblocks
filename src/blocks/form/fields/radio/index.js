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
	title: _x( 'Radio', 'block name' ),
	keywords: [ _x( 'Choose', 'block keyword' ), _x( 'Select', 'block keyword' ), _x( 'Option', 'block keyword' ) ],
	description: __( 'A field with multiple options where only one choice can be made.' ),
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

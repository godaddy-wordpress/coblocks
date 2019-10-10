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
	title: _x( 'Telephone', 'block name' ),
	keywords: [
		_x( 'Phone', 'block keyword' ),
		_x( 'Cellular phone', 'block keyword' ),
		_x( 'Mobile', 'block keyword' ),
	],
	description: __( 'Add a phone number input.' ),
	icon: icons.telephone,
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

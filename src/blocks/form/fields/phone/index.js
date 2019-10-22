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
	title: _x( 'Phone', 'block name', 'coblocks' ),
	keywords: [ _x( 'telephone', 'block keyword', 'coblocks' ), _x( 'cellular', 'block keyword', 'coblocks' ), _x( 'mobile', 'block keyword', 'coblocks' ) ],
	description: __( 'A phone number to allow visitors to give you a phone number.', 'coblocks' ),
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

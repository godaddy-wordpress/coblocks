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
	title: _x( 'Date', 'block name' ),
	keywords: [
		_x( 'Calendar', 'block keyword' ),
		_x( 'day month year', 'block search term' ),
	],
	description: __( 'The best way to set a date. Add a date picker.' ),
	icon: icons.date,
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

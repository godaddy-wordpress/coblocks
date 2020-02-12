/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Event Item', 'block name', 'coblocks' ),
	description: __( 'An event within the events block.', 'coblocks' ),
	icon,
	attributes,
	supports: {
		reusable: false,
		html: false,
	},
	parent: [ 'coblocks/events' ],
	edit,
	save,
};

export { name, category, icon, metadata, settings };

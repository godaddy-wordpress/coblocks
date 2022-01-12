/**
 * External dependencies
 */
import { EventItemIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated';

/**
 * WordPress dependencies.
 */
import { __, _x } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Event Item', 'block name', 'coblocks' ),
	description: __( 'An event within the events block.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	attributes,
	supports: {
		reusable: false,
		html: false,
	},
	parent: [ 'coblocks/events' ],
	edit,
	save,
	deprecated
};

export { name, category, icon, metadata, settings };

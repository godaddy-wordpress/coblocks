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

/**
 * WordPress dependencies.
 */
import { Icon } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	description: __( 'A question/answer within the FAQ block.', 'coblocks' ),
	edit,
	icon: <Icon icon={ icon } />,
	parent: [ 'coblocks/events' ],
	save,
	supports: {
		html: false,
		reusable: false,
	},
	title: _x( 'FAQ Item', 'block name', 'coblocks' ),
};

export { name, category, icon, metadata, settings };

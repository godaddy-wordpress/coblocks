/**
 * External dependencies
 */
import { EventItemIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import { getBlockIconColor } from '../../../utils/helper';
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
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	parent: [ 'coblocks/faq' ],
	save,
	supports: {
		html: false,
		reusable: false,
	},
	title: _x( 'FAQ Item', 'block name', 'coblocks' ),
};

export { name, category, icon, metadata, settings };

/**
 * External dependencies
 */
import { ServiceItemIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Service', 'coblocks' ),
	/* translators: block description */
	description: __( 'A single service item within a services block.', 'coblocks' ),
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	example: {
		attributes: {},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

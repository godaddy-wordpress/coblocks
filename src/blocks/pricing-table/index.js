/**
 * External dependencies
 */
import { PricingTableIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import example from './example';
import { getBlockIconColor } from '../../utils/helper';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Pricing Table', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add pricing tables to help visitors compare products and plans.', 'coblocks' ),
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'landing', 'coblocks' ),
		/* translators: block keyword */
		__( 'comparison', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		gutter: {
			default: 'medium',
			customDefault: 3,
		},
	},
	example,
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };

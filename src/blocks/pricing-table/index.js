/**
 * Internal dependencies
 */
import edit from './edit';
import example from './example';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { PricingTableIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Pricing Table', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add pricing tables to help visitors compare products and plans.', 'coblocks' ),
	icon: <Icon icon={ PricingTableIcon } />,
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

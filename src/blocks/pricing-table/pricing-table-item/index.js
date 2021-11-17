/**
 * External dependencies
 */
import { PricingTableItemIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import transforms from './transforms';
import save from './save';
import metadata from './block.json';

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
	title: __( 'Pricing Table Item', 'coblocks' ),
	/* translators: block description */
	description: __( 'A pricing table to help visitors compare products and plans.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'landing', 'coblocks' ),
		/* translators: block keyword */
		__( 'comparison', 'coblocks' ),
	],
	parent: [ 'coblocks/pricing-table' ],
	supports: {
		html: false,
		inserter: false,
		reusable: false,
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };

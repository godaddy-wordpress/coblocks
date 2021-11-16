/**
 * External dependencies
 */
import { PricingTableItemIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
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
	attributes,
	deprecated,
	/* translators: block description */
	description: __( 'A pricing table to help visitors compare products and plans.', 'coblocks' ),
	edit,
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'landing', 'coblocks' ),
		/* translators: block keyword */
		__( 'comparison', 'coblocks' ),
	],
	parent: [ 'coblocks/pricing-table' ],
	save,
	supports: {
		html: false,
		inserter: false,
		reusable: false,
	},
	/* translators: block name */
	title: __( 'Pricing Table Item', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };

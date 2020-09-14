/**
 * External dependencies
 */
import { FoodItemIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Food Item', 'coblocks' ),
	/* translators: block description */
	description: __( 'A food and drink item within the Food & Drinks block.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'menu', 'coblocks' ),
	],
	supports: {
		inserter: false,
		customClassName: false,
		reusable: false,
		html: false,
	},
	deprecated,
	parent: [ 'coblocks/food-and-drinks' ],
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

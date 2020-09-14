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
 * External dependencies
 */
import { FoodDrinkIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Food & Drink', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display a menu or price list.', 'coblocks' ),
	icon: <Icon icon={ FoodDrinkIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'restaurant', 'coblocks' ),
		/* translators: block keyword */
		__( 'menu', 'coblocks' ),
	],
	supports: {
		align: [ 'wide' ],
	},
	getEditWrapperProps( atts ) {
		return { 'data-columns': atts.columns };
	},
	deprecated,
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

/**
 * External dependencies
 */
import { FoodDrinkIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import deprecated from './deprecated';
import edit from './edit';
import { getBlockIconColor } from '../../utils/helper';
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
	attributes,
	deprecated,
	/* translators: block description */
	description: __( 'Display a menu or price list.', 'coblocks' ),
	edit,
	example: {
		innerBlocks: [
			{
				attributes: {
					content: 'Appetizers',
				},
				name: 'core/heading',
			},
			{
				attributes: {
					description: 'Corn chips topped w/ black beans, melted cheese, salsa & fresh guacamole',
					price: '$10.90',
					title: 'Vegetarian Nachos',
				},
				name: 'coblocks/food-item',
			},
			{
				attributes: {
					description: 'Breaded white meat chicken tossed in Mild or Hot sauce and served with Ranch or Bleu Cheese dressing',
					price: '$10.90',
					spicy: true,
					title: 'Buffalo Wings',
				},
				name: 'coblocks/food-item',
			},
		],
	},
	getEditWrapperProps( atts ) {
		return { 'data-columns': atts.columns };
	},
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'restaurant', 'coblocks' ),
		/* translators: block keyword */
		__( 'menu', 'coblocks' ),
	],
	save,
	supports: {
		align: [ 'wide' ],
	},
	/* translators: block name */
	title: __( 'Food & Drink', 'coblocks' ),
};

export { name, category, metadata, settings };

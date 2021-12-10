/**
 * External dependencies
 */
import { FoodDrinkIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
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
	/* translators: block description */
	description: __( 'Display a list of testimonials.', 'coblocks' ),
	edit,
	example: {
		innerBlocks: [
			{
				attributes: {
					description: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur.',
					name: 'John Doe',
					title: 'Senior Director',
				},
				name: 'coblocks/testimonial',
			},
			{
				attributes: {
					description: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur.',
					name: 'John Doe',
					title: 'Senior Director',
				},
				name: 'coblocks/testimonial',
			},
		],
	},
	getEditWrapperProps( atts ) {
		return { 'data-columns': atts.columns };
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'reviews', 'coblocks' ),
		/* translators: block keyword */
		__( 'testimonials', 'coblocks' ),
	],
	save,
	supports: {
		align: [ 'wide' ],
	},
	/* translators: block name */
	title: __( 'Testimonials', 'coblocks' ),
};

export { name, category, metadata, settings };

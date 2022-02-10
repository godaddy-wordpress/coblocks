/**
 * External dependencies
 */
import { TestimonialIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';

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
	styles: [
		{
			isDefault: true,
			/* translators: block style */
			label: __( 'Boxy', 'coblocks' ),
			name: 'tall',
		},
		{
			/* translators: block style */
			label: __( 'Conversation', 'coblocks' ),
			name: 'conversation',
		},
		{
			/* translators: block style */
			label: __( 'Horizontal', 'coblocks' ),
			name: 'horizontal',
		},
	],
	supports: {
		align: [ 'wide' ],
	},
	/* translators: block name */
	title: __( 'Testimonials', 'coblocks' ),
};

export { name, category, metadata, settings };

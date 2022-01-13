/**
 * External dependencies
 */
import { TestimonialIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
 * Set default image size equivalent to "Medium".
 */
export const DEFAULT_IMAGE_SIZE = 100;

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	/* translators: block description */
	description: __( 'A Testimonial within the Testimonial block.', 'coblocks' ),
	edit,
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'menu', 'coblocks' ),
	],
	parent: [ 'coblocks/testimonials' ],
	save,
	supports: {
		customClassName: false,
		html: false,
		inserter: false,
		reusable: false,
	},
	/* translators: block name */
	title: __( 'Testimonial', 'coblocks' ),
};

export { name, category, metadata, settings };

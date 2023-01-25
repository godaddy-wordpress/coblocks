/**
 * External dependencies
 */
import { MountainsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
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
	description: __( 'Showcase Yelp reviews on your Wordpress site.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			reviews: [
				{
					author: 'Brett R.',
					authorAvatar: 'https://this-person-does-not-exist.com/img/avatar-1599dcd0e8d1da0ce83fa714f5d320ed.jpg',
					provider: 'yelp',
					reviewDate: '6/6/22',
					reviewURL: 'https://www.yelp.com/biz/godaddy?hrid=1pw89IHjd9U9xzGzMhjRdQ',
					starRating: 5.0,
					uuid: '6f9c2293-d9a4-4268-9e13-d64cb1a38d91',
				},
			],
			yelpBusinessId: 'amici-s-east-coast-pizzeria-at-cloudkitchens-soma-san-francisco',
		},
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'reviews', 'coblocks' ),
		/* translators: block keyword */
		__( 'testimonials', 'coblocks' ),
		/* translators: block keyword */
		__( 'yelp', 'coblocks' ),
	],
	save,
	styles: [
		{
			isDefault: true,
			/* translators: block style */
			label: __( 'Standard', 'coblocks' ),
			name: 'standard',
		},
	],
	/* translators: block name */
	title: __( 'Yelp Reviews', 'coblocks' ),
};

export { name, category, metadata, settings };

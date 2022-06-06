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
	/* translators: block name */
	title: __( 'Yelp Reviews', 'coblocks' ),
	/* translators: block description */
	description: __( 'Showcase Yelp reviews on your Wordpress site.', 'coblocks' ),
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
	styles: [
		{
			name: 'standard',
			/* translators: block style */
			label: __( 'Standard', 'coblocks' ),
			isDefault: true,
		},
	],
	example: {
		attributes: {
			reviews: [
				{
					uuid: '6f9c2293-d9a4-4268-9e13-d64cb1a38d91',
					provider: 'yelp',
					author: 'Brett R.',
					starRating: 5.0,
					reviewURL: 'https://www.yelp.com/biz/godaddy?hrid=1pw89IHjd9U9xzGzMhjRdQ',
					authorAvatar: 'https://this-person-does-not-exist.com/img/avatar-1599dcd0e8d1da0ce83fa714f5d320ed.jpg',
					reviewDate: '6/6/22',
				},
			],
		},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };


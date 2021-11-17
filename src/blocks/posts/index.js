/**
 * External dependencies
 */
import { PostsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Posts', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display posts or an RSS feed as stacked or horizontal cards.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'posts', 'coblocks' ),
		/* translators: block keyword */
		__( 'blog', 'coblocks' ),
		/* translators: block keyword */
		__( 'latest', 'coblocks' ),
		/* translators: block keyword */
		__( 'rss', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		gutter: {
			default: 'medium',
		},
		html: false,
	},
	transforms,
	edit,
	example: {
		attributes: {},
	},
	deprecated,
	save() {
		return null;
	},
};

export { name, category, settings };

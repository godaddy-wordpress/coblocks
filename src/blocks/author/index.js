/**
 * External dependencies
 */
import { AuthorIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
	description: __( 'Add an author biography to build credibility and authority.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			/* translators: example biography */
			biography: __( 'Born to express, not to impress. A maker making the world I want.', 'coblocks' ),
			imgUrl: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg',
			/* translators: example female name */
			name: __( 'Jane Doe', 'coblocks' ),
		},
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'biography', 'coblocks' ),
		/* translators: block keyword */
		__( 'profile', 'coblocks' ),
	],
	save,
	/* translators: block name */
	title: __( 'Author', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };

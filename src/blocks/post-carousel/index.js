/**
 * External dependencies
 */
import { PostCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, Spinner } from '@wordpress/components';
import { lazy, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
const Edit = lazy( () => import( './edit' ) );
import metadata from './block.json';
import transforms from './transforms';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Post Carousel', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display posts or an external blog feed as a carousel.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'slider', 'coblocks' ),
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
		html: false,
	},
	transforms,
	edit: ( props ) => (
		<Suspense fallback={ <Spinner /> }>
			<Edit { ...props } />
		</Suspense>
	),
	example: {
		attributes: {},
	},
	deprecated,
	save() {
		return null;
	},
};

export { name, category, settings };

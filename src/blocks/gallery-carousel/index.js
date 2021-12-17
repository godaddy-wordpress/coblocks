/**
 * External dependencies
 */
import { GalleryCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { variations } from './variations';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name */
	title: __( 'Carousel', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display multiple images in a beautiful carousel gallery.', 'coblocks' ),
	category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	attributes,
	variations,
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword */
		__( 'photos', 'coblocks' ),
	],
	// Disable reason: https://github.com/WordPress/gutenberg/issues/35229
	// example: {},
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		coBlocksSpacing: true,
	},
	transforms,
	edit: ( props ) => (
		<Suspense fallback={ <Spinner /> }>
			<Edit { ...props } />
		</Suspense>
	),
	save,
	deprecated,
};

export { name, category, metadata, settings };

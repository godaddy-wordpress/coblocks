/**
 * External dependencies
 */
import { GalleryMasonryIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	attributes,
	category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	deprecated,
	/* translators: block description */
	description: __( 'Display multiple images in an organized masonry gallery.', 'coblocks' ),
	edit: ( props ) => (
		<Suspense fallback={ <Spinner /> }>
			<Edit { ...props } />
		</Suspense>
	),
	example: {
		innerBlocks: [
			{
				attributes: { url: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg' },
				name: 'core/image',
			},
			{
				attributes: { url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg' },
				name: 'core/image',

			},
			{
				attributes: { url: 'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg' },
				name: 'core/image',

			},
			{
				attributes: { url: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg' },
				name: 'core/image',

			},
			{
				attributes: { url: 'hhttps://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
				name: 'core/image',
			},
		],
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword */
		__( 'photos', 'coblocks' ),
		/* translators: block keyword */
		__( 'lightbox', 'coblocks' ),
	],
	save,
	/* translators: block name */
	title: __( 'Masonry', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };

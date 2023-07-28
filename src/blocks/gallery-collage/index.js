/**
 * External dependencies
 */
import { GalleryCollageIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon, Spinner } from '@wordpress/components';
import { lazy, Suspense } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import deprecated from './deprecated';
const Edit = lazy( () => import( './edit' ) );
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * Block constants.
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
	gutter: {
		type: 'string',
		default: 'small',
	},
};

const settings = {
	category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword */
		__( 'photos', 'coblocks' ),
	],
	styles: [
		{
			name: 'default',
			/* translators: block style */
			label: __( 'Default', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'tiled',
			/* translators: block style */
			label: __( 'Tiled', 'coblocks' ),
		},
		{
			name: 'layered',
			/* translators: block style */
			label: __( 'Layered', 'coblocks' ),
		},
	],
	example: {
		attributes: {
			images: [
				{ index: 0, url: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg' },
				{ index: 1, url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg' },
				{ index: 2, url: 'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg' },
				{ index: 3, url: 'https://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
				{ index: 4, url: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg' },
			],
		},
	},
	attributes,
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

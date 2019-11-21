/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name */
	title: __( 'Collage', 'coblocks' ),
	/* translators: block description */
	description: __( 'Assemble images into a beautiful collage gallery.', 'coblocks' ),
	icon,
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
	supports: {
		align: [ 'wide', 'full' ],
	},
	example: {
		attributes: {
			gutter: 1,
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
	edit,
	save,
};

export { name, category, metadata, settings };

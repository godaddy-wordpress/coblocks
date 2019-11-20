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
				{ index: 0, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/St_Pancras_Railway_Station_2012-06-23.jpg/711px-St_Pancras_Railway_Station_2012-06-23.jpg' },
				{ index: 1, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Beautiful_river_landscape_in_the_fall.jpg/640px-Beautiful_river_landscape_in_the_fall.jpg' },
				{ index: 2, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Landscape_of_Jackson_Hole%2C_October_2010.jpg/640px-Landscape_of_Jackson_Hole%2C_October_2010.jpg' },
				{ index: 3, url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/California_Drought_Dry_Riverbed_2009.jpg' },
				{ index: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Taiga_Landscape_in_Canada.jpg/640px-Taiga_Landscape_in_Canada.jpg' },
				{ index: 5, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lesotho_Landscape.jpg/640px-Lesotho_Landscape.jpg' },
				{ index: 6, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Landscape_dunes.JPG/640px-Landscape_dunes.JPG' },

			],
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };

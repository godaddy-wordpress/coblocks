/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name.  */
	title: __( 'Masonry', 'coblocks' ),
	description: __( 'Display multiple images in an organized masonry gallery.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword.  */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'photos', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'lightbox', 'coblocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			gridSize: 'lrg',
			gutter: 5,
			images: [
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/St_Pancras_Railway_Station_2012-06-23.jpg/711px-St_Pancras_Railway_Station_2012-06-23.jpg' },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Beautiful_river_landscape_in_the_fall.jpg/640px-Beautiful_river_landscape_in_the_fall.jpg' },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Landscape_of_Jackson_Hole%2C_October_2010.jpg/640px-Landscape_of_Jackson_Hole%2C_October_2010.jpg' },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/California_Drought_Dry_Riverbed_2009.jpg' },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Taiga_Landscape_in_Canada.jpg/640px-Taiga_Landscape_in_Canada.jpg' },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lesotho_Landscape.jpg/640px-Lesotho_Landscape.jpg' },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Landscape_dunes.JPG/640px-Landscape_dunes.JPG' },
			],
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, icon, metadata, settings };

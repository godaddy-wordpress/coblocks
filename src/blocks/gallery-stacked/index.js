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
	/* translators: block name */
	title: __( 'Stacked', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display multiple images in an single column stacked gallery.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword */
		__( 'photos', 'coblocks' ),
		/* translators: block keyword */
		__( 'lightbox', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full', 'left', 'center', 'right' ],
		html: false,
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			fullwidth: false,
			gutter: 5,
			radius: 12,
			images: [
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Beautiful_river_landscape_in_the_fall.jpg/640px-Beautiful_river_landscape_in_the_fall.jpg' },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Landscape_of_Jackson_Hole%2C_October_2010.jpg/640px-Landscape_of_Jackson_Hole%2C_October_2010.jpg' },
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

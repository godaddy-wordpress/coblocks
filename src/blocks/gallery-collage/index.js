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
	title: __( 'Collage', 'coblocks' ),
	description: __( 'Assemble images into a beautiful collage gallery.', 'coblocks' ),
	icon,
	keywords: [ __( 'gallery', 'coblocks' ), __( 'photos', 'coblocks' ) ],
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'tiled',
			label: __( 'Tiled', 'coblocks' ),
		},
		{
			name: 'layered',
			label: __( 'Layered', 'coblocks' ),
		},
	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };

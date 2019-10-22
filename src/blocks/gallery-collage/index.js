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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Collage', 'block name', 'coblocks' ),
	description: __( 'Assemble images into a beautiful collage gallery.', 'coblocks' ),
	icon,
	keywords: [ _x( 'gallery', 'block keyword', 'coblocks' ), _x( 'photos', 'block keyword', 'coblocks' ) ],
	styles: [
		{
			name: 'default',
			label: _x( 'Default', 'block style', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'tiled',
			label: _x( 'Tiled', 'block style', 'coblocks' ),
		},
		{
			name: 'layered',
			label: _x( 'Layered', 'block style', 'coblocks' ),
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

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import { BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import metadata from './block.json';
import edit from './edit';
import icons from './icons';
import transforms from './transforms';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Features' );

const icon = icons.features;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title,

	description: __( 'Add up to three columns of small notes for your product or service.' ),

	keywords: [ __( 'services' ), __( 'coblocks' ) ],

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	transforms,

	edit,

	getEditWrapperProps( attributes ) {
		const { id, layout, columns } = attributes;

		// If no layout is seleted, return the following.
		if ( ! layout ) {
			return { 'data-id': id, 'data-columns': columns };
		}

		return { 'data-id': id, 'data-columns': columns };
	},

	save,
};

export { name, title, icon, settings };

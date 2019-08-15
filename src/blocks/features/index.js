/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import { BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
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
const name = 'features';

const title = __( 'Features' );

const icon = icons.features;

const blockAttributes = {
	gutter: {
		type: 'string',
		default: 'large',
	},
	columns: {
		type: 'number',
		default: 2,
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
	...DimensionsAttributes,
	...BackgroundAttributes,
};

const settings = {
	title: title,

	description: __( 'Add up to three columns of small notes for your product or service.' ),

	keywords: [ __( 'services' ), __( 'coblocks' ) ],

	attributes: blockAttributes,

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

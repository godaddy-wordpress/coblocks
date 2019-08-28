/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';
import save from './save';
import transforms from './transforms';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Pricing Table' );

const icon = icons.pricing;

const settings = {
	title,

	description: __( 'Add pricing tables.' ),

	keywords: [ __( 'landing' ), __( 'comparison' ), __( 'coblocks' ) ],

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},

	transforms,

	edit,

	save,
};

export { name, icon, settings };

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../../utils/icons';
import transforms from './transforms';
import save from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Pricing Table Item' );

const icon = icons.pricing;

const settings = {
	title,

	description: __( 'A column placed within the pricing table block.' ),

	keywords: [ __( 'landing' ), __( 'comparison' ), 'coblocks' ],

	parent: [ 'coblocks/pricing-table' ],

	supports: {
		html: false,
		inserter: false,
		reusable: false,
	},

	attributes,

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };

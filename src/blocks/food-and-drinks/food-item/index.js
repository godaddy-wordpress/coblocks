/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';
import metadata from './block.json';
import icons from './icons';
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { attributes, name } = metadata;

const title = __( 'Food Item' );

const icon = icons.foodItem;

const keywords = [];

const settings = {
	title,

	description: __( 'A food and drink item within the Food & Drinks block.' ),

	keywords,

	attributes,

	supports: {
		inserter: false,
		customClassName: false,
		reusable: false,
		html: false,
	},

	parent: [ 'coblocks/food-and-drinks' ],

	edit,

	save,
};

export { name, title, icon, settings };

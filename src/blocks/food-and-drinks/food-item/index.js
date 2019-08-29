/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';
import metadata from './block.json';
import icon from './icon';
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

// const icon = icons.foodItem;

const settings = {
	title: __( 'Food Item' ),
	description: __( 'A food and drink item within the Food & Drinks block.' ),
	icon,
	keywords: __( 'menu' ),
	supports: {
		inserter: false,
		customClassName: false,
		reusable: false,
		html: false,
	},
	parent: [ 'coblocks/food-and-drinks' ],
	attributes,
	edit,
	save,
};

export { name, settings };

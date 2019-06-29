/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';

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
const name = 'food-item';

const title = __( 'Food Item' );

const icon = icons.foodItem;

const keywords = [];

const attributes = {
	title: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-food-item__heading',
		default: '',
	},
	description: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-food-item__description',
		default: '',
	},
	price: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-food-item__price span',
		default: '',
	},
	url: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
		default: '',
	},
	alt: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'alt',
		default: '',
	},
	focalPoint: {
		type: 'object',
	},
	glutenFree: {
		type: 'boolean',
	},
	pescatarian: {
		type: 'boolean',
	},
	spicy: {
		type: 'boolean',
	},
	spicier: {
		type: 'boolean',
	},
	vegetarian: {
		type: 'boolean',
	},
	vegan: {
		type: 'boolean',
	},
	showImage: {
		type: 'boolean',
		default: false,
	},
	showPrice: {
		type: 'boolean',
		default: true,
	},
};

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

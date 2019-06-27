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
const name = 'menu-item';

const title = __( 'Menu Item' );

const icon = icons.menuItem;

const keywords = [];

const attributes = {
	showImage: {
		type: 'boolean',
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
		default: false,
	},
	showPrice: {
		type: 'boolean',
		source: 'html',
		selector: '.wp-block-coblocks-menu-item__price span',
		default: true,
	},
	imageUrl: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'alt',
		default: '',
	},
	title: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-menu-item__heading',
		default: '',
	},
	description: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-menu-item__description',
		default: '',
	},
	itemPrice: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-menu-item__price span',
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
};

const settings = {
	title,

	description: __( 'A menu item within the menu block.' ),

	keywords,

	attributes,

	supports: {
		inserter: false,
		customClassName: false,
	},

	parent: [ 'coblocks/menu' ],

	edit,
	save,
};

export { name, title, icon, settings };

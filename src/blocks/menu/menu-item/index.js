/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';

import icons from '../components/icons';
import edit from './components/edit';
import save from './components/save';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const name = 'menu-item';

const title = __( 'Menu Item' );

const icon = icons.menu;

const keywords = [];

const attributes = {
	showImage: { type: 'boolean', default: false },
	showPrice: { type: 'boolean', default: true },
	imageUrl: { type: 'string', default: '' },
	title: { type: 'string', default: '' },
	description: { type: 'string', default: '' },
	itemPrice: { type: 'string', default: '' },
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

/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';

import icons from './components/icons';
import edit from './components/edit';
import save from './components/save';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const name = 'menu';

const title = __( 'Menu' );

const icon = icons.menu;

const keywords = [ __( 'restaurant' ), __( 'food' ), __( 'services' ) ];

const attributes = {
	showImages: { type: 'boolean', default: false },
	showPrices: { type: 'boolean', default: true },
};

const settings = {
	title,

	description: __( 'Display a menu or price list.' ),

	keywords,

	attributes,

	edit,

	save,
};

export { name, title, icon, settings };

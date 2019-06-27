/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';

import edit from './edit';
import icons from './icons';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { name } = metadata;

const icon = icons.foodAndDrinks;

const settings = {
	title: __( 'Food & Drinks' ),
	description: __( 'Display a menu or price list.' ),
	keywords: [ __( 'restaurant' ), __( 'menu' ) ],
	edit,
	save,
};

export { metadata, name, icon, settings };

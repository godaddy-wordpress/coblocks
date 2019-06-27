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

const icon = icons.menu;

const settings = {
	title: __( 'Menu' ),
	description: __( 'Display a menu or price list.' ),
	keywords: [ __( 'restaurant' ), __( 'food' ), __( 'menu' ) ],
	attributes: metadata.attributes,
	edit,
	save,
};

export { metadata, name, icon, settings };

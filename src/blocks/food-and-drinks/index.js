/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __, _x } = wp.i18n;

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Food & Drinks', 'block name' ),
	description: __( 'Display a menu or price list.' ),
	icon,
	keywords: [ _x( 'restaurant', 'block keyword' ), _x( 'menu', 'block keyword' ) ],
	supports: {
		align: [ 'wide' ],
	},
	getEditWrapperProps( attributes ) {
		return { 'data-columns': attributes.columns };
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

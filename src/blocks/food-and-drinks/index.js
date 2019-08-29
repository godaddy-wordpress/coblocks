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
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { attributes, name } = metadata;

const settings = {
	title: __( 'Food & Drinks' ),
	description: __( 'Display a menu or price list.' ),
	icon,
	keywords: [ __( 'restaurant' ), __( 'menu' ) ],
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

export { name, metadata, settings };

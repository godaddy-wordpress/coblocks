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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Food & Drinks', 'block name', 'coblocks' ),
	description: __( 'Display a menu or price list.', 'coblocks' ),
	icon,
	keywords: [ _x( 'restaurant', 'block keyword', 'coblocks' ), _x( 'menu', 'block keyword', 'coblocks' ) ],
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

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
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Food & Drinks', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display a menu or price list.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'restaurant', 'coblocks' ),
		/* translators: block keyword */
		__( 'menu', 'coblocks' ),
	],
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

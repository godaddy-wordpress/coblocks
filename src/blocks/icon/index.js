/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import deprecated from './deprecated';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Set default icon size equivalent to "Medium".
 */
export const DEFAULT_ICON_SIZE = 60;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Icon', 'coblocks' ),
	description: __( 'Add a stylized graphic symbol to communicate something more.', 'coblocks' ),
	icon,
	keywords: [ __( 'icons', 'coblocks' ), 'svg', 'coblocks' ],
	styles: [
		{ name: 'outlined', label: __( 'Outlined', 'coblocks' ), isDefault: true },
		{ name: 'filled', label: __( 'Filled', 'coblocks' ) },
	],
	attributes,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };

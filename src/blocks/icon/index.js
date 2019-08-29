/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Set default icon size equivalent to "Medium".
 */
export const DEFAULT_ICON_SIZE = 60;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const settings = {
	title: __( 'Icon' ),
	description: __( 'Add a stylized graphic symbol to communicate something more.' ),
	icon,
	keywords: [ __( 'icons' ), 'svg', 'coblocks' ],
	styles: [
		{ name: 'outlined', label: _x( 'Outlined', 'block style' ), isDefault: true },
		{ name: 'filled', label: _x( 'Filled', 'block style' ) },
	],
	attributes,
	edit,
	save,
};

export { name, metadata, settings };

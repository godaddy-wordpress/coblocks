
/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icon from './icon';
import edit from './edit';
import save from './save';
import metadata from './block.json';

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

// const icon = icons.icon;

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

export { name, settings };


/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
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

const title = __( 'Icon' );

const icon = icons.icon;

const settings = {
	title,

	description: __( 'Add a stylized graphic symbol to communicate something more.' ),

	keywords: [ __( 'icons' ), 'svg', 'coblocks' ],

	attributes,

	styles: [
		{ name: 'outlined', label: _x( 'Outlined', 'block style' ), isDefault: true },
		{ name: 'filled', label: _x( 'Filled', 'block style' ) },
	],

	edit,

	save,
};

export { name, title, icon, settings };

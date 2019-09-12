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
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Icon', 'block name' ),
	description: __( 'Add a stylized graphic symbol to communicate something more.' ),
	icon,
	keywords: [ _x( 'icons', 'block keyword' ), 'svg', 'coblocks' ],
	styles: [
		{ name: 'outlined', label: _x( 'Outlined', 'block style' ), isDefault: true },
		{ name: 'filled', label: _x( 'Filled', 'block style' ) },
	],
	example: {
		attributes: {
			width: 260,
		},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

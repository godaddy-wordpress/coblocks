/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import save from './save';
import icons from './icons';
import edit from './edit';
import transforms from './transforms';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const icon = icons.hr;

const title = __( 'Dynamic HR' );

const settings = {
	title,

	description: __( 'Add a resizable spacer between other blocks.' ),

	keywords: [ __( 'spacer' ), 'hr', 'coblocks' ],

	attributes,

	styles: [
		{ name: 'dots', label: _x( 'Dot', 'block style' ), isDefault: true },
		{ name: 'line', label: _x( 'Line', 'block style' ) },
		{ name: 'fullwidth', label: _x( 'Fullwidth', 'block style' ) },
	],

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };

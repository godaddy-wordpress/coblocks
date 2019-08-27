/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import save from './save';
import icons from './icons';
import edit from './edit';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const name = 'dynamic-separator';

const title = __( 'Dynamic HR' );

const icon = icons.hr;

const blockAttributes = {
	height: {
		type: 'number',
		default: 50,
	},
	color: {
		type: 'string',
	},
	customColor: {
		type: 'string',
	},
};

const settings = {

	title,

	description: __( 'Add a resizable spacer between other blocks.' ),

	keywords: [	'hr',	__( 'spacer' ),	'coblocks' ],

	attributes: blockAttributes,

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

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './icons';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Shape Divider' );

const icon = icons.shapeDivider;

const settings = {
	title,

	description: __( 'Add a shape divider to visually distinquish page sections.' ),

	keywords: [ __( 'separator' ), 'hr', 'svg' ],

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,

	},

	styles: [
		{ name: 'wavy', label: _x( 'Wavy', 'block style' ), isDefault: true },
		{ name: 'hills', label: _x( 'Hills', 'block style' ) },
		{ name: 'waves', label: _x( 'Waves', 'block style' ) },
		{ name: 'angled', label: _x( 'Angled', 'block style' ) },
		{ name: 'sloped', label: _x( 'Sloped', 'block style' ) },
		{ name: 'rounded', label: _x( 'Rounded', 'block style' ) },
		{ name: 'triangle', label: _x( 'Triangle', 'block style' ) },
		{ name: 'pointed', label: _x( 'Pointed', 'block style' ) },
	],

	attributes,

	transforms,

	edit,

	save,

	deprecated,
};

export { name, title, icon, settings };

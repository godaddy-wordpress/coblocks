/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './icons';
import dividers from './dividers';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Return the appropriate SVG for the block style.
 *
 * @param {Array} className The class names.
 * @returns {String} The divider.
 */
export function getDividerFromStyle( className ) {
	const angled = includes( className, 'is-style-angled' );
	const hills = includes( className, 'is-style-hills' );
	const pointed = includes( className, 'is-style-pointed' );
	const rounded = includes( className, 'is-style-rounded' );
	const sloped = includes( className, 'is-style-sloped' );
	const triangle = includes( className, 'is-style-triangle' );
	const waves = includes( className, 'is-style-waves' );

	let divider = dividers.wavy;

	if ( angled ) {
		divider = dividers.angled;
	} else if ( sloped ) {
		divider = dividers.sloped;
	} else if ( triangle ) {
		divider = dividers.triangle;
	} else if ( rounded ) {
		divider = dividers.rounded;
	} else if ( waves ) {
		divider = dividers.waves;
	} else if ( pointed ) {
		divider = dividers.pointed;
	} else if ( hills ) {
		divider = dividers.hills;
	}

	return divider;
}

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Shape Divider' );

const icon = icons.shapeDivider;

const settings = {
	title,

	description: __( 'Add a shape divider to visually distinquish page sections.' ),

	keywords: [ __( 'hr' ), __( 'separator' ), __( 'svg' ) ],

	attributes,

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

	transforms,

	edit,

	save,

	deprecated,
};

export { name, title, icon, settings };


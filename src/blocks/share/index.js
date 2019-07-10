/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const name = 'social';

const title = __( 'Share' );

const icon = icons.social;

const keywords = [ __( 'social' ), __( 'coblocks' ) ];

const settings = {
	title,

	description: __( 'Add social sharing links to help you get likes and shares.' ),

	keywords,

	styles: [
		{ name: 'mask', label: _x( 'Mask', 'block style' ) },
		{ name: 'icon', label: _x( 'Icon', 'block style' ), isDefault: true },
		{ name: 'text', label: _x( 'Text', 'block style' ) },
		{ name: 'icon-and-text', label: _x( 'Icon & Text', 'block style' ) },
		{ name: 'circular', label: _x( 'Circular', 'block style' ) },
	],

	edit,

	save() {
		return null;
	},
};

export { name, title, icon, settings };

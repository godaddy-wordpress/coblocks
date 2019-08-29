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
const name = 'coblocks/social';

const icon = icons.social;

const settings = {
	title: __( 'Share' ),
	description: __( 'Add social sharing links to help you get likes and shares.' ),
	keywords: [ __( 'social' ), 'coblocks' ],
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

export { name, icon, settings };

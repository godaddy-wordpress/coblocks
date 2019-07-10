/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';
import { transforms } from './transforms';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const name = 'social-profiles';

const title = __( 'Social Profiles' );

const icon = icons.socialProfiles;

const keywords = [ __( 'social' ), __( 'coblocks' ), __( 'profile' ) ];

const settings = {
	title,

	description: __( 'Add social profile links to help build your brand.' ),

	keywords,

	styles: [
		{ name: 'mask', label: _x( 'Mask', 'block style' ) },
		{ name: 'icon', label: _x( 'Icon', 'block style' ), isDefault: true },
		{ name: 'text', label: _x( 'Text', 'block style' ) },
		{ name: 'icon-and-text', label: _x( 'Icon & Text', 'block style' ) },
		{ name: 'circular', label: _x( 'Circular', 'block style' ) },
	],

	edit,

	transforms,

	save() {
		return null;
	},
};

export { name, title, icon, settings };

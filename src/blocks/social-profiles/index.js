/**
 * Styles.
 */
import './styles/editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import { transforms } from './transforms';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const name = 'coblocks/social-profiles';

const settings = {
	title: __( 'Social Profiles' ),
	description: __( 'Display links to social media profiles.' ),
	icon,
	category: 'coblocks',
	keywords: [ __( 'share' ), __( 'links' ), __( 'icons' ) ],
	styles: [
		{ name: 'mask', label: _x( 'Mask', 'block style' ) },
		{ name: 'icon', label: _x( 'Icon', 'block style' ), isDefault: true },
		{ name: 'text', label: _x( 'Text', 'block style' ) },
		{ name: 'icon-and-text', label: _x( 'Icon & Text', 'block style' ) },
		{ name: 'circular', label: _x( 'Circular', 'block style' ) },
	],

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	edit,
	transforms,
	save() {
		return null;
	},
};

export { name, settings };

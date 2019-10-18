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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const name = 'coblocks/social-profiles';

const settings = {
	title: _x( 'Social Profiles', 'block name', 'coblocks' ),
	description: __( 'Grow your audience with links to social media profiles.', 'coblocks' ),
	icon,
	category: 'coblocks',
	keywords: [ _x( 'share', 'block keyword', 'coblocks' ), _x( 'links', 'block keyword', 'coblocks' ), _x( 'icons', 'block keyword', 'coblocks' ) ],
	styles: [
		{ name: 'mask', label: _x( 'Mask', 'block style', 'coblocks' ) },
		{ name: 'icon', label: _x( 'Icon', 'block style', 'coblocks' ), isDefault: true },
		{ name: 'text', label: _x( 'Text', 'block style', 'coblocks' ) },
		{ name: 'icon-and-text', label: _x( 'Icon & Text', 'block style', 'coblocks' ) },
		{ name: 'circular', label: _x( 'Circular', 'block style', 'coblocks' ) },
	],
	example: {
		attributes: {
			facebook: '#',
			instagram: '#',
			pinterest: '#',
			twitter: '#',
			youtube: '#',
			textAlign: 'center',
		},
	},
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

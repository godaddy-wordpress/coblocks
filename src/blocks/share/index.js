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

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const name = 'coblocks/social';

const settings = {
	title: _x( 'Share', 'block name' ),
	description: __( 'Add social sharing links to help you get likes and shares.' ),
	icon,
	category: 'coblocks',
	keywords: [ _x( 'social', 'block keyword' ), 'coblocks' ],
	styles: [
		{ name: 'mask', label: _x( 'Mask', 'block style' ) },
		{ name: 'icon', label: _x( 'Icon', 'block style' ), isDefault: true },
		{ name: 'text', label: _x( 'Text', 'block style' ) },
		{ name: 'icon-and-text', label: _x( 'Icon & Text', 'block style' ) },
		{ name: 'circular', label: _x( 'Circular', 'block style' ) },
	],
	example: {
		attributes: {
			facebook: '#',
			twitter: '#',
			pinterest: '#',
			linkedin: '#',
			email: '#',
			tumblr: '#',
			textAlign: 'center',
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	edit,
	save() {
		return null;
	},
};

export { name, settings };

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
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name. */
	title: __( 'Share', 'coblocks' ),
	description: __( 'Add social sharing links to help you get likes and shares.', 'coblocks' ),
	icon,
	keywords: [ /* translators: block keyword. */ __( 'social', 'coblocks' ), 'coblocks' ],
	styles: [
		{ name: 'mask', label: /* translators: block style. */ __( 'Mask', 'coblocks' ) },
		{ name: 'icon', label: /* translators: block style. */ __( 'Icon', 'coblocks' ), isDefault: true },
		{ name: 'text', label: /* translators: block style. */ __( 'Text', 'coblocks' ) },
		{ name: 'icon-and-text', label: /* translators: block style. */ __( 'Icon & Text', 'coblocks' ) },
		{ name: 'circular', label: /* translators: block style. */ __( 'Circular', 'coblocks' ) },
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

export { name, category, settings };

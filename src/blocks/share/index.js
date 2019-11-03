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
	title: __( 'Share', 'coblocks' ),
	description: __( 'Add social sharing links to help you get likes and shares.', 'coblocks' ),
	icon,
	keywords: [ __( 'social', 'coblocks' ), 'coblocks' ],
	styles: [
		{ name: 'mask', label: __( 'Mask', 'coblocks' ) },
		{ name: 'icon', label: __( 'Icon', 'coblocks' ), isDefault: true },
		{ name: 'text', label: __( 'Text', 'coblocks' ) },
		{ name: 'icon-and-text', label: __( 'Icon & Text', 'coblocks' ) },
		{ name: 'circular', label: __( 'Circular', 'coblocks' ) },
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

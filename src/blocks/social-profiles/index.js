/**
 * Styles.
 */
import './styles/editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import { transforms } from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	title: __( 'Social Profiles', 'coblocks' ),
	description: __( 'Grow your audience with links to social media profiles.', 'coblocks' ),
	icon,
	keywords: [ __( 'share', 'coblocks' ), __( 'links', 'coblocks' ), __( 'icons', 'coblocks' ) ],
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

export { name, category, settings };

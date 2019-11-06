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
	/* translators: block name. */
	title: __( 'Social Profiles', 'coblocks' ),
	description: __( 'Grow your audience with links to social media profiles.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword. */
		__( 'share', 'coblocks' ),
		/* translators: block keyword. */
		__( 'links', 'coblocks' ),
		/* translators: block keyword. */
		__( 'icons', 'coblocks' ) ],
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

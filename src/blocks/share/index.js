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
	/* translators: block name */
	title: __( 'Share', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add social sharing links to help you get likes and shares.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'social', 'coblocks' ),
	],
	styles: [
		{
			name: 'mask',
			/* translators: block style */
			label: __( 'Mask', 'coblocks' ),
		},
		{
			name: 'icon',
			/* translators: block style */
			label: __( 'Icon', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'text',
			/* translators: block style */
			label: __( 'Text', 'coblocks' ),
		},
		{
			name: 'icon-and-text',
			/* translators: block style */
			label: __( 'Icon & Text', 'coblocks' ),
		},
		{
			name: 'circular',
			/* translators: block style */
			label: __( 'Circular', 'coblocks' ),
		},
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

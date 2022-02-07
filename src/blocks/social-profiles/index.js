/**
 * External dependencies
 */
import { SocialProfilesIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import { transforms } from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Social Profiles', 'coblocks' ),
	/* translators: block description */
	description: __( 'Grow your audience with links to social media profiles.', 'coblocks' ),
	category: hasFormattingCategory ? 'common' : 'widgets',
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'share', 'coblocks' ),
		/* translators: block keyword */
		__( 'links', 'coblocks' ),
		/* translators: block keyword */
		__( 'icons', 'coblocks' ),
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

/**
 * External dependencies
 */
import { ShareIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import transforms from './transforms';
import { hasFormattingCategory } from '../../utils/block-helpers';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Share', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add social sharing links to help you get likes and shares.', 'coblocks' ),
	category: hasFormattingCategory ? 'common' : 'widgets',
	icon: <Icon icon={ icon } />,
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
	transforms,
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		replaceBlocks(
			[ props.clientId ],
			switchToBlockType( props, 'core/social-links' )
		);
		return null;
	},
	save() {
		return null;
	},
};

export { name, category, settings };

/**
 * Internal dependencies
 */
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
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
	parent: [],
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

/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

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
			/* translators: block style */
			label: __( 'Mask', 'coblocks' ),
			name: 'mask',
		},
		{
			isDefault: true,
			/* translators: block style */
			label: __( 'Icon', 'coblocks' ),
			name: 'icon',
		},
		{
			/* translators: block style */
			label: __( 'Text', 'coblocks' ),
			name: 'text',
		},
		{
			/* translators: block style */
			label: __( 'Icon & Text', 'coblocks' ),
			name: 'icon-and-text',
		},
		{
			/* translators: block style */
			label: __( 'Circular', 'coblocks' ),
			name: 'circular',
		},
	],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	transforms,
	edit: ( props ) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		const { colors } = select( 'core/block-editor' )?.getSettings() || {};

		let transformedBlock = switchToBlockType( props, 'core/social-links' );

		// Wrap in a group block if blockBackground is set.
		const groupProps = {
			backgroundColor: props.attributes.blockBackgroundColor,
			style: {
				color: {
					background: props.attributes.customBlockBackgroundColor,
				},
			},
		};

		if ( !! groupProps.backgroundColor || !! groupProps.style.color.background ) {
			const backgroundColorObj = find( colors, { slug: groupProps.background } );

			if ( backgroundColorObj ) {
				groupProps.style.color.background = backgroundColorObj.color;
			}

			transformedBlock = createBlock( 'core/group', groupProps, transformedBlock );
		}

		replaceBlocks(
			[ props.clientId ],
			transformedBlock,
		);
		return null;
	},
	save() {
		return null;
	},
};

export { name, category, settings, metadata };

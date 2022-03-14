/**
 * External dependencies
 */
import { GalleryStackedIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

[
	{
		attributes: {
			className: 'is-style-stacked',
			columns: 1,
		},
		description: __( 'stacked gallery', 'coblocks' ),
		icon: GalleryStackedIcon,
		name: 'stacked',
		title: __( 'Stacked (CoBlocks)', 'coblocks' ),
	},
].forEach( ( variation ) => registerBlockVariation( 'core/gallery', variation ) );

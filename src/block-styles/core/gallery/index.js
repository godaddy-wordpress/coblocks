/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

[
	{
		label: __( 'Stacked', 'coblocks' ),
		name: 'stacked',
	},
].forEach( ( variation ) => registerBlockStyle( 'core/gallery', variation ) );

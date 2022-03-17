/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

import './style.scss';

[
	{
		label: __( 'Compact', 'coblocks' ),
		name: 'compact',
	},
	{
		label: __( 'Masonry', 'coblocks' ),
		name: 'masonry',
	},
].forEach( ( variation ) => registerBlockStyle( 'core/gallery', variation ) );

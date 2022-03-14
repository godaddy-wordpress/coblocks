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
].forEach( ( variation ) => registerBlockStyle( 'core/gallery', variation ) );

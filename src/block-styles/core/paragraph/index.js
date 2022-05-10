/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

import './style.scss';

[
	{
		label: __( 'Info', 'coblocks' ),
		name: 'info',
	},
	{
		label: __( 'Success', 'coblocks' ),
		name: 'success',
	},
	{
		label: __( 'Warning', 'coblocks' ),
		name: 'warning',
	},
	{
		label: __( 'error', 'coblocks' ),
		name: 'error',
	},
].forEach( ( variation ) => registerBlockStyle( 'core/paragraph', variation ) );

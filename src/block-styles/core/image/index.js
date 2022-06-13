
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

import './style.scss';

[
	{
		label: __( 'Service', 'coblocks' ),
		name: 'service',
	},
].forEach( ( variation ) => registerBlockStyle( 'core/image', variation ) );

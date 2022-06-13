/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

export const BLOCK_VARIATION_IMAGE_SERVICE = {
	attributes: {
		className: 'is-style-service',
	},
	description: __( 'Service Photo', 'coblocks' ),
	name: 'service',
	title: __( 'Service Photo', 'coblocks' ),
};

[
	BLOCK_VARIATION_IMAGE_SERVICE,
].forEach( ( variation ) => registerBlockVariation( 'core/image', variation ) );

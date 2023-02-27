/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { AlertIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { setIconColorProps } from '../../../utils/helper';

const icon = setIconColorProps( AlertIcon );

export const BLOCK_VARIATION_PARAGRAPH_ALERT_INFO = {
	attributes: {
		className: 'is-style-info',
	},
	/* translators: block variation description */
	description: __( 'Informational alert.', 'coblocks' ),
	icon,
	keywords: [ 'coblocks' ],
	name: 'alert-info',
	/* translators: block variation name */
	title: __( 'Informational alert', 'coblocks' ),
};

export const BLOCK_VARIATION_PARAGRAPH_ALERT_WARNING = {
	attributes: {
		className: 'is-style-warning',
	},
	/* translators: block variation description */
	description: __( 'Warning alert.', 'coblocks' ),
	icon,
	keywords: [ 'coblocks' ],
	name: 'alert-warning',
	/* translators: block variation name */
	title: __( 'Warning alert', 'coblocks' ),
};

export const BLOCK_VARIATION_PARAGRAPH_ALERT_ERROR = {
	attributes: {
		className: 'is-style-error',
	},
	/* translators: block variation description */
	description: __( 'Error alert.', 'coblocks' ),
	icon,
	keywords: [ 'coblocks' ],
	name: 'alert-error',
	/* translators: block variation name */
	title: __( 'Error alert', 'coblocks' ),

};

export const BLOCK_VARIATION_PARAGRAPH_ALERT_SUCCESS = {
	attributes: {
		className: 'is-style-success',
	},
	/* translators: block variation description */
	description: __( 'Success alert.', 'coblocks' ),
	icon,
	keywords: [ 'coblocks' ],
	name: 'alert-success',
	/* translators: block variation name */
	title: __( 'Success alert', 'coblocks' ),
};

[
	BLOCK_VARIATION_PARAGRAPH_ALERT_INFO,
	BLOCK_VARIATION_PARAGRAPH_ALERT_WARNING,
	BLOCK_VARIATION_PARAGRAPH_ALERT_ERROR,
	BLOCK_VARIATION_PARAGRAPH_ALERT_SUCCESS,
].forEach( ( variation ) => registerBlockVariation( 'core/paragraph', variation ) );

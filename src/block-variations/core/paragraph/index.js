/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { paragraph } from '@wordpress/icons';
import { registerBlockVariation } from '@wordpress/blocks';

export const BLOCK_VARIATION_PARAGRAPH_ALERT_INFO = {
	attributes: {
		className: 'is-style-info',
	},
	/* translators: block variation description */
	description: __( 'Informational alert.', 'coblocks' ),
	icon: paragraph,
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
	icon: paragraph,
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
	icon: paragraph,
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
	icon: paragraph,
	name: 'alert-success',
	/* translators: block variation name */
	title: __( 'Success alert', 'coblocks' ),
};

export const BLOCK_VARIATION_COLUMNS_AUTHOR_LAYOUT = {
	/* translators: block variation description */
	description: __( 'Success alert.', 'coblocks' ),
	icon: paragraph,
	innerBlocks: [
		[ 'core/column', { width: '25%' }, [
			[ 'core/image', {} ],
		] ],
		[ 'core/column', { width: '75%' }, [
			[ 'core/heading', {} ],
			[ 'core/paragraph', {} ],
			[ 'core/buttons', {} ],

		] ],
	],
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

[
	BLOCK_VARIATION_COLUMNS_AUTHOR_LAYOUT,
].forEach( ( variation ) => registerBlockVariation( 'core/columns', variation ) );

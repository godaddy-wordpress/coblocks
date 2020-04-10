/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Link options.
 */
const linkOptions = [
	{ value: 'none', label: __( 'None', 'coblocks' ) },
	{ value: 'media', label: __( 'Media file', 'coblocks' ) },
	{ value: 'attachment', label: __( 'Attachment page', 'coblocks' ) },
	{ value: 'custom', label: __( 'Custom URL', 'coblocks' ) },

];

export default linkOptions;

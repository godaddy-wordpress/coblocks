/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Link options.
 */
const linkOptions = [
	{ label: __( 'None', 'coblocks' ), value: 'none' },
	{ label: __( 'Media file', 'coblocks' ), value: 'media' },
	{ label: __( 'Attachment page', 'coblocks' ), value: 'attachment' },
	{ label: __( 'Custom URL', 'coblocks' ), value: 'custom' },

];

export default linkOptions;

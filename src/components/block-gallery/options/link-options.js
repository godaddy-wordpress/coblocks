/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Link options.
 */
const linkOptions = [
	{ value: 'none', label: __( 'None' ) },
	{ value: 'media', label: __( 'Media File' ) },
	{ value: 'attachment', label: __( 'Attachment Page' ) },
	{ value: 'custom', label: __( 'Custom URL' ) },

];

export default linkOptions;
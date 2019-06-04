/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Link options.
 */
const linkOptions = [
	{ value: 'none', label: __( 'None' ) },
	{ value: 'attachment', label: __( 'Attachment Page' ) },
	{ value: 'media', label: __( 'Media File' ) },
	{ value: 'custom', label: __( 'Custom' ) },

];

export default linkOptions;
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Link options.
 */
const captionOptions = [
	{ value: 'dark', label: __( 'Dark' ) },
	{ value: 'light', label: __( 'Light' ) },
	{ value: 'none', label: __( 'None' ) },
];

export default captionOptions;

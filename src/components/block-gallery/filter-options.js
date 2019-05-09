/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Link options.
 */
const filterOptions = [
	{ value: 'grayscale', label: __( 'Grayscale' ) },
	{ value: 'sepia', label: __( 'Sepia' ) },
	{ value: 'saturation', label: __( 'Saturation' ) },
	{ value: 'dim', label: __( 'Dark' ) },
	{ value: 'vintage', label: __( 'Vintage' ) },
	{ value: 'none', label: __( 'Original' ) },
];

export default filterOptions;
/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;

/**
 * Link options.
 */
const captionOptions = [
	{ value: 'dark', label: _x( 'Dark', 'block styles' ) },
	{ value: 'light', label: _x( 'Light', 'block styles' ) },
	{ value: 'none', label: _x( 'None', 'block styles' ) },
];

export default captionOptions;

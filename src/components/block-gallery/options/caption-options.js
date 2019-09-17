/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;

/**
 * Link options.
 */
const captionOptions = [
	{ value: 'dark', label: _x( 'Dark', 'visual style option' ) },
	{ value: 'light', label: _x( 'Light', 'visual style option' ) },
	{ value: 'none', label: _x( 'None', 'visual style option' ) },
];

export default captionOptions;

/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';

/**
 * Link options.
 */
const captionOptions = [
	{ value: 'dark', label: _x( 'Dark', 'visual style option', 'coblocks' ) },
	{ value: 'light', label: _x( 'Light', 'visual style option', 'coblocks' ) },
	{ value: 'none', label: _x( 'None', 'visual style option', 'coblocks' ) },
];

export default captionOptions;

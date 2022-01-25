/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Link options.
 */
const captionOptions = [
	{
		/* translators: visual style option */
		label: __( 'Dark', 'coblocks' ),
		value: 'dark',
	},
	{
		/* translators: visual style option */
		label: __( 'Light', 'coblocks' ),
		value: 'light',
	},
	{
		/* translators: visual style option */
		label: __( 'None', 'coblocks' ),
		value: 'none',
	},
];

export default captionOptions;

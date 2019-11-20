/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Link options.
 */
const captionOptions = [
	{
		value: 'dark',
		/* translators: visual style option */
		label: __( 'Dark', 'coblocks' ),
	},
	{
		value: 'light',
		/* translators: visual style option */
		label: __( 'Light', 'coblocks' ),
	},
	{
		value: 'none',
		/* translators: visual style option */
		label: __( 'None', 'coblocks' ),
	},
];

export default captionOptions;

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const gutterOptions = [
	{
		value: 'no',
		label: __( 'None', 'coblocks' ),
		shortName: __( 'None', 'coblocks' ),
	},
	{
		value: 'small',
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
		tooltip: __( 'Small', 'coblocks' ),
	},
	{
		value: 'medium',
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
		tooltip: __( 'Medium', 'coblocks' ),
	},
	{
		value: 'large',
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
		tooltip: __( 'Large', 'coblocks' ),
	},
	{
		value: 'huge',
		/* translators: abbreviation for largest size */
		label: __( 'XL', 'coblocks' ),
		tooltip: __( 'Huge', 'coblocks' ),
	},
];

export default gutterOptions;

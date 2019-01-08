/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const FontSizes = [
	{
		name: __( 'Small' ),
		shortName: 'S',
		size: 14,
	},
	{
		name: __( 'Regular' ),
		shortName: 'M',
		size: 16,
	},
	{
		name: __( 'Large' ),
		shortName: 'L',
		size: 20,
	},
	{
		name: __( 'Larger' ),
		shortName: 'XL',
		size: 24,
	},
];

export default FontSizes;
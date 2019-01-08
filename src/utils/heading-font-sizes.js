/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const HeadingFontSizes = [
	{
		name: __( 'Small' ),
		shortName: 'S',
		size: 20,
	},
	{
		name: __( 'Regular' ),
		shortName: 'M',
		size: 24,
	},
	{
		name: __( 'Large' ),
		shortName: 'L',
		size: 28,
	},
	{
		name: __( 'Larger' ),
		shortName: 'XL',
		size: 36,
	},
];

export default HeadingFontSizes;
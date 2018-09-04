/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const Colors = withColors(
	'backgroundColor',
	{ buttonBackground: 'background-color' },
	{ buttonColor: 'color' },
	{ featuredTableBackground: 'background-color' },
	{ featuredTableColor: 'color' },
	{ tableBackground: 'background-color' },
	{ tableColor: 'color' },
);

export default Colors;
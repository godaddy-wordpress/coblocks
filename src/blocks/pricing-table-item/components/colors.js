/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const Colors = withColors(
	'backgroundColor',
	{ tableBackground: 'background-color' },
	{ tableColor: 'color' },
);

export default Colors;
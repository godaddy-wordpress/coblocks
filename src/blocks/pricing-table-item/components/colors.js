/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ tableBackground: 'background-color' },
	{ tableColor: 'color' },
);

export default applyWithColors;
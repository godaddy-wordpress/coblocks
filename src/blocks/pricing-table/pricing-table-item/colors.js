/**
 * WordPress dependencies
 */
const { withColors } = wp.blockEditor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ backgroundColor: 'background-color' },
	{ textColor: 'color' },
);

export default applyWithColors;

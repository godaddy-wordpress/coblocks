/**
 * WordPress dependencies
 */
const { withColors } = wp.blockEditor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ textColor: 'color' },
	{ buttonColor: 'background-color' },
);

export default applyWithColors;
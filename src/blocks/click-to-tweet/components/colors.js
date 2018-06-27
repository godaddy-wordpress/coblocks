/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ textColor: 'color' },
	{ buttonColor: 'background-color' },
);

export default applyWithColors;
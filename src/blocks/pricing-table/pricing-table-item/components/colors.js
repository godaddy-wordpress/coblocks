/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ backgroundColor: 'background-color' },
	{ textColor: 'color' },
);

export default applyWithColors;
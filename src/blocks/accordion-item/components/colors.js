/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ titleBackgroundColor: 'background-color' },
	{ titleColor: 'color' },
	{ textColor: 'color' },
);

export default applyWithColors;
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
	{ titleColor: 'color' },
);

export default applyWithColors;
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
	{ borderColor: 'border-color' },
);

export default applyWithColors;
/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ cardBackgroundColor: 'background-color' },
	{ headingColor: 'color' },
	{ textColor: 'color' },
	{ buttonColor: 'color' },
	{ buttonBackground: 'background-color' },
);

export default applyWithColors;
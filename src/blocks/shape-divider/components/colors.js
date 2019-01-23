/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	{ color: 'color' },
);

export default applyWithColors;
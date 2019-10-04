/**
 * WordPress dependencies
 */
const { withColors } = wp.blockEditor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ iconColor: 'color' },
);

export default applyWithColors;

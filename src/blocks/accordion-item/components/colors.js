/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const Colors = withColors(
	'backgroundColor',
	{ titleBackgroundColor: 'background-color' },
	{ titleColor: 'color' },
	{ titleColor: 'color' },
	{ textColor: 'color' },
);

export default Colors;
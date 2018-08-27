/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const Colors = withColors(
	{ color: 'color' },
);

export default Colors;
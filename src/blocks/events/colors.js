/**
 * WordPress dependencies
 */
import { withColors } from '@wordpress/block-editor';

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	{ textColor: 'color' },
);

export default applyWithColors;

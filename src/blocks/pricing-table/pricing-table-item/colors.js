/**
 * WordPress dependencies
 */
import { withColors } from '@wordpress/block-editor';

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ backgroundColor: 'background-color' },
	{ textColor: 'color' },
);

export default applyWithColors;

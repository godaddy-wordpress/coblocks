/**
 * WordPress dependencies
 */
import { withColors } from '@wordpress/block-editor';

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'backgroundColor',
	{ color: 'color' },
);

export default applyWithColors;

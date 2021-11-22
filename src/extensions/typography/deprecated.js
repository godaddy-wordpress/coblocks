import { addFilter } from '@wordpress/hooks';
import { TypographyAttributes } from '../../components/typography-controls';
import { deprecatedBlocks } from './constants';

/**
 * Compares against list of blocks with deprecated typography controls and prepares
 * attributes for deprecation when needed.
 *
 * Does not modify settings for registered block - Will only modify attributes
 * used within the deprecated function.
 *
 * @param {Object} attributes Original registered block attributes.
 * @return {Object} Block attributes filtered for deprecation .
 */
export function deprecateTypographyControls( attributes ) {
	addFilter(
		'blocks.registerBlockType',
		'coblocks/inspector/attributes',
		( settings ) => {
			if ( deprecatedBlocks.includes( settings.name ) ) {
				attributes = Object.assign( attributes, TypographyAttributes );
			}
			return settings;
		}
	);
	return attributes;
}

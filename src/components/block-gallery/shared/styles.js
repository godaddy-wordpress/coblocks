/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Background Classes.
 *
 * @param {Object} attributes The passed attributes.
 * @return {Object} the styles.
 */
function GalleryStyles( attributes ) {
	const captionColorClass = getColorClassName( 'color', attributes.captionColor );

	const styles = {
		color: captionColorClass ? undefined : attributes.customCaptionColor,
	};

	return styles;
}

export default GalleryStyles;

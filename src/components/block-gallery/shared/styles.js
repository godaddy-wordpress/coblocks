/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * Background Classes.
 *
 * @param {Object} attributes The passed attributes.
 * @returns {Object} the styles.
 */
function GalleryStyles( attributes ) {
	const captionColorClass = getColorClassName( 'color', attributes.captionColor );

	const styles = {
		color: captionColorClass ? undefined : attributes.customCaptionColor,
	};

	return styles;
}

export default GalleryStyles;

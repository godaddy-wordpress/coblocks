/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * CSS classes.
 *
 * @param {Object} attributes The passed attributes.
 * @returns {Array} The gallery classes.
 */
function GalleryClasses( attributes ) {
	const captionColorClass = getColorClassName( 'color', attributes.captionColor );

	const {
		align,
		radius,
		filter,
		captionStyle,
		customCaptionColor,
		backgroundPadding,
		backgroundPaddingMobile,
	} = attributes;

	return [
		'coblocks-gallery',
		{ 'has-no-alignment': ! align },
		{ [ `has-border-radius-${ radius }` ]: radius > 0 },
		{ [ `has-filter-${ filter }` ]: filter !== 'none' },
		{ [ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined },
	];
}

export default GalleryClasses;

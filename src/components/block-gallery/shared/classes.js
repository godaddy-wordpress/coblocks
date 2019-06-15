/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * CSS classes
 */
function GalleryClasses( attributes ) {

	const captionColorClass = getColorClassName( 'color', attributes.captionColor );

	const {
		align,
		images,
		radius,
		filter,
		captionStyle,
		customCaptionColor,
		backgroundPadding,
		backgroundPaddingMobile,
	} = attributes;

	return [
		'coblocks-gallery',
		{ 'has-no-alignment' : ! align },
		{ [ `has-border-radius-${ radius }` ] : radius > 0 },
		{ [ `has-filter-${ filter }` ] : filter != 'none' },
		{ [ `has-caption-style-${ captionStyle }` ] : captionStyle != undefined },
		{ 'has-caption-color': captionColorClass || customCaptionColor },
		captionColorClass,
		{ [ `has-background-border-radius-${ attributes.backgroundRadius }` ] : attributes.backgroundRadius > 0 },
		{ 'has-padding': backgroundPadding > 0 },
		{ [ `has-padding-${ backgroundPadding }` ] : backgroundPadding > 0 },
		{ [ `has-padding-mobile-${ backgroundPaddingMobile }` ] : backgroundPaddingMobile > 0 },
	];
}

export default GalleryClasses;

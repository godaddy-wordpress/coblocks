/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.editor;

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
	} = attributes;

	return [
		'blockgallery',
		{ 'has-no-alignment' : ! align },
		{ [ `has-border-radius-${ radius }` ] : radius > 0 },
		{ [ `has-filter-${ filter }` ] : filter != 'none' },
		{ [ `has-caption-style-${ captionStyle }` ] : captionStyle != undefined },
		{ 'has-caption-color': captionColorClass, },
		captionColorClass,
		{ [ `has-background-border-radius-${ attributes.backgroundRadius }` ] : attributes.backgroundRadius > 0 },
		{ 'has-padding': attributes.backgroundPadding > 0 },
		{ [ `has-padding-${ attributes.backgroundPadding }` ] : attributes.backgroundPadding > 0 },
		{ [ `has-padding-mobile-${ attributes.backgroundPaddingMobile }` ]: attributes.backgroundPaddingMobile > 0 },
	];
}

export default GalleryClasses;

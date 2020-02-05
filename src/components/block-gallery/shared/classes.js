/**
 * CSS classes.
 *
 * @param {Object} attributes The passed attributes.
 * @return {Array} The gallery classes.
 */
function GalleryClasses( attributes ) {
	const {
		align,
		radius,
		filter,
		captionStyle,
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

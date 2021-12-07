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
		captionStyle,
		filter,
	} = attributes;

	return [
		'coblocks-gallery',
		{ 'has-no-alignment': ! align },
		{ [ `has-filter-${ filter }` ]: filter !== 'none' },
		{ [ `has-border-radius-${ radius }` ]: radius > 0 },
		{ [ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined },
	];
}

export default GalleryClasses;

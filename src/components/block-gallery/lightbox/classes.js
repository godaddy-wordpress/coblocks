/**
 * CSS classes
 */
function LightboxClasses( attributes ) {
	return [
		{ 'has-lightbox': attributes.lightbox },
		{ [ `has-lightbox-style-${ attributes.lightboxStyle }` ] : attributes.lightbox && attributes.lightboxStyle },
	];
}

export default LightboxClasses;
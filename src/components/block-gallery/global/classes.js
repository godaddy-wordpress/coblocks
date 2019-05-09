/**
 * Internal dependencies
 */
import { LightboxClasses } from '../lightbox';
import { BackgroundClasses } from '../background';

/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.editor;

/**
 * CSS classes
 */
function GlobalClasses( attributes ) {

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
		...LightboxClasses( attributes ),
		...BackgroundClasses( attributes ),
		captionColorClass,
	];
}

export default GlobalClasses;

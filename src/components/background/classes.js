/**
 * Internal dependencies
 */
import * as ratio from './../../utils/helper';

/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.editor;

/**
 * Background Classes
 */
function BackgroundClasses( attributes ) {

	const backgroundClass = getColorClassName( 'background-color', attributes.backgroundColor );
	const backgroundSize = attributes.backgroundSize ? attributes.backgroundSize : 'cover';

	return [
		{ 'has-background': attributes.backgroundColor || attributes.customBackgroundColor },
		{ [ backgroundClass ]: backgroundClass },
		{ 'has-parallax': attributes.backgroundImg && attributes.hasParallax },
		{ [ `has-background-${ attributes.backgroundType }` ] : attributes.backgroundImg && attributes.backgroundType },
		{ 'is-transient': attributes.backgroundImg && 0 === attributes.backgroundImg.indexOf( 'blob:' ) },
		{ [ `bg-${ attributes.backgroundRepeat }` ] : attributes.backgroundImg && attributes.backgroundRepeat },
		{ [ `bg-${ attributes.backgroundPosition.split(' ').join('-') }` ] : attributes.backgroundImg && attributes.backgroundPosition },
		{ [ `bg-${ backgroundSize }` ] : attributes.backgroundImg },
		{ [ `has-background-overlay` ] : attributes.backgroundImg && attributes.backgroundOverlay !== 0 },
		{ [ ratio.overlayToClass( attributes.backgroundOverlay ) ] : attributes.backgroundImg && attributes.backgroundOverlay !== 0  && attributes.backgroundOverlay !== 50 },
	];
}

export default BackgroundClasses;
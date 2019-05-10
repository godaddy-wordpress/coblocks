/**
 * Internal dependencies
 */
import * as ratio from './../../../utils/helper';

/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.editor;

/**
 * Background Classes
 */
function BackgroundClasses( attributes ) {

	const backgroundClass = getColorClassName( 'background-color', attributes.backgroundColor );
	const backgroundSizeDefault = ( typeof options !== 'undefined' && typeof options.backgroundSize !== 'undefined' ) ? options.backgroundSize : 'cover';
	const backgroundSize = attributes.backgroundSize ? attributes.backgroundSize : backgroundSizeDefault;

	return [
		{ 'has-background': attributes.backgroundColor || attributes.customBackgroundColor },
		{ [ backgroundClass ]: backgroundClass },
		{ 'has-padding': attributes.backgroundPadding > 0 },
		{ [ `has-background-border-radius-${ attributes.backgroundRadius }` ] : attributes.backgroundRadius > 0 },
		{ [ `has-padding-${ attributes.backgroundPadding }` ] : attributes.backgroundPadding > 0 },
		{ [ `has-padding-mobile-${ attributes.backgroundPaddingMobile }` ]: attributes.backgroundPaddingMobile > 0 },
		{ 'has-parallax': attributes.backgroundImg && attributes.hasParallax },
		{ 'has-background-image': attributes.backgroundImg },
		{ [ `has-background-${ attributes.backgroundRepeat }` ] : attributes.backgroundImg && attributes.backgroundRepeat },
		{ [ `has-background-${ attributes.backgroundPosition.split(' ').join('-') }` ] : attributes.backgroundImg && attributes.backgroundPosition },
		{ [ `has-background-${ backgroundSize }` ] : attributes.backgroundImg },
		{ [ `has-background-overlay` ] : attributes.backgroundImg && attributes.backgroundOverlay !== 0 },
		{ [ ratio.overlayToClass( attributes.backgroundOverlay ) ] : attributes.backgroundImg && attributes.backgroundOverlay !== 0  && attributes.backgroundOverlay !== 50 },
	];
}

export default BackgroundClasses;
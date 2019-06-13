/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.blockEditor;

/**
 * Background Classes
 */
function BackgroundStyles( attributes ) {

	const backgroundClass = getColorClassName( 'background-color', attributes.backgroundColor );

	const styles = {
		backgroundImage: attributes.backgroundImg && attributes.backgroundType == 'image' ? `url(${ attributes.backgroundImg })` : undefined,
		backgroundColor: backgroundClass ? undefined : attributes.customBackgroundColor,
		backgroundPosition:  attributes.focalPoint && !  attributes.hasParallax ? `${  attributes.focalPoint.x * 100 }% ${  attributes.focalPoint.y * 100 }%` : undefined,
	};

	return styles;
}

export default BackgroundStyles;
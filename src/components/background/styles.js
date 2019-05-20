/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.editor;

/**
 * Background Classes
 */
function BackgroundStyles( { backgroundImg, backgroundType, backgroundColor, customBackgroundColor, focalPoint, hasParallax, backgroundSize, backgroundSizePercent } ) {

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	const styles = {
		backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundPosition: backgroundImg && focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		backgroundSize: backgroundImg && ['auto', 'cover', 'contain'].indexOf(backgroundSize) === -1 && ( backgroundSizePercent || backgroundSizePercent === 0 ) ? `${ backgroundSizePercent }%` : undefined,
	};

	return styles;
}

export default BackgroundStyles;
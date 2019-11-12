/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Background Classes
 *
 * @param {Object} attributes      The attributes.
 * @param {Object} backgroundColor The selected background color.
 * @returns {Object} styles.
 */
const BackgroundStyles = ( attributes, backgroundColor ) => {
	const backgroundClass = attributes && getColorClassName( 'background-color', attributes.backgroundColor );

	const styles = {
		backgroundImage: attributes.backgroundImg && attributes.backgroundType === 'image' ? `url(${ attributes.backgroundImg })` : undefined,
		backgroundColor: backgroundClass ? backgroundColor && backgroundColor.color : attributes.customBackgroundColor,
		backgroundPosition: attributes.focalPoint && ! attributes.hasParallax ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined,
	};

	return styles;
};

export default BackgroundStyles;

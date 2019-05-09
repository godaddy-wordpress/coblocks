/**
 * WordPress dependencies
 */
const { getColorClassName } = wp.editor;

/**
 * Background Classes
 */
function BackgroundStyles( attributes ) {

	const backgroundClass = getColorClassName( 'background-color', attributes.backgroundColor );

	const styles = {
		backgroundImage: attributes.backgroundImg ? `url(${ attributes.backgroundImg })` : undefined,
		backgroundColor: backgroundClass ? undefined : attributes.customBackgroundColor,
	};

	return styles;
}

export default BackgroundStyles;
/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors( ( getColor, setColor, { attributes } ) => {
	return {
		backgroundColor: getColor( attributes.backgroundColor, attributes.customBackgroundColor, 'background-color' ),
		setBackgroundColor: setColor( 'backgroundColor', 'customBackgroundColor' ),
		textColor: getColor( attributes.textColor, attributes.customTextColor, 'color' ),
		setTextColor: setColor( 'textColor', 'customTextColor' ),
	};
} );

export default applyWithColors;
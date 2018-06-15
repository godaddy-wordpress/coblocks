/**
 * WordPress dependencies
 */
const { withColors } = wp.editor;

/**
 * Generate block colors.
 */
const applyWithColors = withColors( ( getColor, setColor, { attributes } ) => {
	return {
		buttonColor: getColor( attributes.buttonColor, attributes.customButtonColor, 'background-color' ),
		setButtonColor: setColor( 'buttonColor', 'customButtonColor' ),
		textColor: getColor( attributes.textColor, attributes.customTextColor, 'color' ),
		setTextColor: setColor( 'textColor', 'customTextColor' ),
	};
} );

export default applyWithColors;
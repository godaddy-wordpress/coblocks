/**
 * Apply styling
 *
 * @param {Object} attributes the passed attributes.
 * @return {Object} the style object.
 */
function applyStyle( attributes ) {
	const { customTextColor, customBackgroundColor } = attributes;

	const style = {
		color: customTextColor || null,
		backgroundColor: customBackgroundColor || null,
	};

	if ( typeof attributes.customTextColor !== 'undefined' ) {
		style.color = attributes.customTextColor;
	}

	if ( typeof attributes.customBackgroundColor !== 'undefined' ) {
		style.backgroundColor = attributes.customBackgroundColor;
	}

	return style;
}

export default applyStyle;

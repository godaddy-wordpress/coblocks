/**
 * Apply styling
 */
function applyStyle( attributes, props ) {
	const {
		customTextColor,
		customBackgroundColor,
	} = attributes;

	let style = {
		color: customTextColor || null,
		backgroundColor: customBackgroundColor || null,
	};

	if( typeof attributes.customTextColor !== 'undefined' ){
		style.color = attributes.customTextColor || null;
	}

	if( typeof attributes.customBackgroundColor !== 'undefined' ){
		style.backgroundColor = attributes.customBackgroundColor || null;
	}

	return style;
}

export default applyStyle;
function applyStyle( attributes ) {
	const {
		color,
		backgroundColor,
		customTextColor,
		customBackgroundColor,
	} = attributes;

	const style = {
		color: color || null,
		backgroundColor: backgroundColor || null,
	};

	if ( typeof customTextColor !== 'undefined' ) {
		style.color = customTextColor || null;
	}

	if ( typeof customBackgroundColor !== 'undefined' ) {
		style.backgroundColor = customBackgroundColor || null;
	}

	return style;
}

export default applyStyle;

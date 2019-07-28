function applyStyle( attributes, name ) {
	const {
		fontFamily,
		lineHeight,
		letterSpacing,
		fontWeight,
		textTransform,
	} = attributes;

	const style = {
		lineHeight: lineHeight || null,
		fontFamily: fontFamily || null,
		fontWeight: fontWeight || null,
		textTransform: textTransform || null,
		letterSpacing: letterSpacing || null,
	};

	if ( typeof attributes.customFontSize !== 'undefined' ) {
		style.fontSize = attributes.customFontSize + 'px' || null;
	}

	if ( typeof attributes.customTextColor !== 'undefined' ) {
		style.color = attributes.customTextColor || null;
	}

	if ( name === 'coblocks/column' && typeof attributes.width !== 'undefined' ) {
		style.width = attributes.width + '%';
	}

	return style;
}

export default applyStyle;

/**
 * Set the attributes for the Text Panel transformations
 * @type {Object}
 */
function TypographyTransforms( props ) {

	const transforms = {
		fontSize: props.fontSize,
		customFontSize: props.customFontSize,
		fontFamily: props.fontFamily,
		lineHeight: props.lineHeight,
		letterSpacing: props.letterSpacing,
		textColor: props.textColor,
		fontWeight: props.fontWeight,
		textTransform: props.textTransform,
		customTextColor: props.customTextColor,
	};

	return transforms;
}

export default TypographyTransforms;
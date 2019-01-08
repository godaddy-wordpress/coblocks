

function applyStyle( attributes, props ) {
	const {
		customTextColor,
		customCoBlocksBackgroundColor,
	} = attributes;

	let style = {
		color: customTextColor || null,
		backgroundColor: customCoBlocksBackgroundColor || null,
	};

	if( typeof attributes.customTextColor !== 'undefined' ){
		style.color = attributes.customTextColor || null;
	}

	if( typeof attributes.customCoBlocksBackgroundColor !== 'undefined' ){
		style.backgroundColor = attributes.customCoBlocksBackgroundColor || null;
	}
	
	return style;
}

export default applyStyle;
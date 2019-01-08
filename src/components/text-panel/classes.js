/**
 * Set inline CSS classes
 */
function TypograpyClasses( props ) {
	return [
		{ 'has-text-color': props.attributes.textColor || props.attributes.customTextColor  },
	];
}

export default TypograpyClasses;
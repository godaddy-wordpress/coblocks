/**
 * Set inline CSS classes
 */
function ColorSettingsClasses( props ) {
	return [
		{ 'has-text-color': props.attributes.textColor || props.attributes.customTextColor },
	];
}

export default ColorSettingsClasses;

/**
 * Set inline CSS classes
 */
function ButtonPanelClasses( props ) {
	return [
		{ 'has-text-color': props.attributes.buttonColor || props.attributes.customButtonColor },
	];
}

export default ButtonPanelClasses;
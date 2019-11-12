/**
 * Set the attributes for the Text Panel transformations.
 *
 * @param {Object} props Passed props.
 * @returns {Object} transforms.
 */
function ColorTransforms( props ) {
	const transforms = {
		textColor: props.textColor,
		customBackgroundColor: props.customBackgroundColor,
	};

	return transforms;
}

export default ColorTransforms;

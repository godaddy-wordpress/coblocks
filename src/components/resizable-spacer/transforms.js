/**
 * Set the attributes for the Resizable Spacer component transformations.
 *
 * @param {Object} props The passed props.
 * @returns {Object} The transforms.
 */
function ResizableSpacerTransforms( props ) {
	const transforms = {
		spacerButton: props.spacerButton,
		spacerContent: props.spacerContent,
		spacerHeading: props.spacerHeading,
	};

	return transforms;
}

export default ResizableSpacerTransforms;

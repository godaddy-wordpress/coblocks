/**
 * Set the attributes for the Background transformations
 * @type {Object}
 */
function BackgroundImageTransforms( props ) {

	const transforms = {
		backgroundColor: props.backgroundColor,
		customBackgroundColor: props.customBackgroundColor,
		backgroundImg: props.backgroundImg,
		backgroundOverlay: props.backgroundOverlay,
		backgroundPosition: props.backgroundPosition,
		backgroundRepeat: props.backgroundRepeat,
		backgroundSize: props.backgroundSize,
		hasParallax: props.hasParallax,
	};

	return transforms;
}

export default BackgroundImageTransforms;
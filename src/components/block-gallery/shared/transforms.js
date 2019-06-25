/**
 * Internal dependencies
 */
import * as helper from './../../../utils/helper';

/**
 * Set global transforms that every block uses.
 * @type {Object}
 */
function GalleryTransforms( props ) {

	const transforms = {
		align: props.align,
		autoPlay: props.autoPlay,
		autoPlaySpeed: props.autoPlaySpeed,
		captionColor: props.captionColor,
		captions: props.captions,
		customCaptionColor: props.customCaptionColor,
		customFontSize: props.customFontSize,
		draggable: props.draggable,
		filter: props.filter,
		fontSize: props.fontSize,
		gridSize: props.gridSize,
		gutter: props.gutter,
		gutterMobile: props.gutterMobile,
		height: props.height,
		images: props.images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
		linkTo: props.linkTo,
		pageDots: props.pageDots,
		prevNextButtons: props.prevNextButtons,
		primaryCaption: props.primaryCaption,
		radius: props.radius,
		rel: props.rel,
		shadow: props.shadow,
		target: props.target,
	};

	return transforms;
}

export default GalleryTransforms;
/**
 * Internal dependencies
 */
import * as helper from './../../../utils/helper';

/**
 * Set global transforms that every block uses.
 *
 * @param {Object} props The passed props.
 * @return {Object} The transforms.
 */
function GalleryTransforms( props ) {
	const transforms = {
		align: props.align,
		animation: props.animation,
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
		gutterMobile: props.gutterMobile,
		height: props.height,
		images: props.images?.map( ( image, index ) => {
			return { ...helper.pickRelevantMediaFiles( image ), index };
		} ),
		lightbox: props.lightbox,
		linkTo: props.linkTo,
		noBottomMargin: props.noBottomMargin,
		noTopMargin: props.noTopMargin,
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

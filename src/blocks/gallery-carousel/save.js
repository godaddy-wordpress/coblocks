/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { compose, withInstanceId } from '@wordpress/compose';
import { ResizableBox, Spinner } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

// const save = ( props ) => {
// 	const { attributes, setAttributes, isSelected, clientId, noticeUI, className } = props;
// 	const {
// 		align,
// 		gridSize,
// 		gutter,
// 		gutterMobile,
// 		height,
// 		images,
// 		pageDots,
// 		prevNextButtons,
// 		primaryCaption,
// 		alignCells,
// 		thumbnails,
// 		responsiveHeight,
// 		lightbox,
// 		autoPlay,
// 		autoPlaySpeed,
// 		carouselId,
// 	} = attributes;

// 	const classes = classnames(
// 		className, {
// 			'has-responsive-height': responsiveHeight,
// 		}

// 	const innerClasses = classnames(
// 		'is-cropped',
// 		...GalleryClasses( attributes ), {
// 			[ `align${ align }` ]: align,
// 			'has-horizontal-gutter': gutter > 0,
// 			'is-selected': isSelected,
// 			'has-lightbox': lightbox,
// 			'has-no-arrows': prevNextButtons,
// 		}
// 	);

// 	const flickityClasses = classnames(
// 		'has-carousel',
// 		`has-carousel-${ gridSize }`, {
// 			'has-aligned-cells': alignCells,
// 			[ `has-margin-bottom-${ gutter }` ]: thumbnails && gutter > 0,
// 			[ `has-margin-bottom-mobile-${ gutterMobile }` ]: thumbnails && gutterMobile > 0,
// 		}
// 	);

// 	const flickityStyles = {
// 		height: height ? height + 'px' : undefined,
// 	};

// 	const figureClasses = classnames(
// 		'coblocks-gallery--figure', {
// 			[ `has-margin-left-${ gutter }` ]: gutter > 0,
// 			[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
// 			[ `has-margin-right-${ gutter }` ]: gutter > 0,
// 			[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
// 		}
// 	);

// 	const flickityOptions = {
// 		autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
// 		draggable,
// 		pageDots,
// 		prevNextButtons,
// 		wrapAround: true,
// 		cellAlign: alignCells ? 'left' : 'center',
// 		pauseAutoPlayOnHover: pauseHover,
// 		freeScroll,
// 		arrowShape: {
// 			x0: 10,
// 			x1: 60, y1: 50,
// 			x2: 65, y2: 45,
// 			x3: 20,
// 		},
// 		thumbnails,
// 		responsiveHeight,
// 	};

// 	const captionClasses = classnames(
// 		'coblocks-gallery--caption',
// 		'coblocks-gallery--primary-caption', {}
// 	);

// 	const navClasses = classnames(
// 		'carousel-nav', {
// 			[ `has-margin-top-${ gutter }` ]: gutter > 0,
// 			[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
// 			[ `has-negative-margin-left-${ gutter }` ]: gutter > 0,
// 			[ `has-negative-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
// 			[ `has-negative-margin-right-${ gutter }` ]: gutter > 0,
// 			[ `has-negative-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
// 		}
// 	);

// 	);
// 	};

// 	return (
// 		<div className={ classes }>
// 			<div className={ innerClasses }>
// 				<div
// 					className={ flickityClasses }
// 					style={ responsiveHeight ? undefined : flickityStyles }
// 					data-flickity={ JSON.stringify( flickityOptions ) }
// 				>
// 					{ images.map( ( image ) => {
// 						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

// 						return (
// 							<div key={ image.id || image.url } className="coblocks-gallery--item">
// 								<figure className={ figureClasses }>
// 									{ img }
// 								</figure>
// 							</div>
// 						);
// 					} ) }
// 				</div>
// 				{ thumbnails ?
// 					<div
// 						className={ navClasses }
// 						data-flickity={ JSON.stringify( navOptions ) }
// 					>
// 						{ images.map( ( image ) => {
// 							const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } />;
// 							return (
// 								<div key={ image.id || image.url } className="coblocks--item-thumbnail">
// 									<figure className={ navFigureClasses }>
// 										{ img }
// 									</figure>
// 								</div>
// 							);
// 						} ) }
// 					</div> : null
// 				}
// 			</div>
// 			{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } /> }
// 		</div>
// 	);
// };

const save = ( props ) => {
	const { attributes, setAttributes, isSelected, clientId, noticeUI, className } = props;
	const {
		align,
		gridSize,
		gutter,
		gutterMobile,
		height,
		images,
		pageDots,
		prevNextButtons,
		primaryCaption,
		alignCells,
		thumbnails,
		responsiveHeight,
		lightbox,
		autoPlay,
		autoPlaySpeed,
		carouselId,
	} = attributes;

	const hasImages = !! images.length;

	if ( ! hasImages ) {
		return;
	}

	const captionClasses = classnames(
		'coblocks-gallery--caption',
		'coblocks-gallery--primary-caption', {}
	);

	const innerClasses = classnames(
		'is-cropped',
		...GalleryClasses( attributes ), {
			[ `align${ align }` ]: align,
			'has-horizontal-gutter': gutter > 0,
			'is-selected': isSelected,
			'has-lightbox': lightbox,
			'has-no-arrows': ! prevNextButtons,
		}
	);

	const classes = classnames(
		className, {
			'has-responsive-height': responsiveHeight,
		}
	);

	const renderAmpCarouselThumnails = () => {
		return (
			<div className="coblocks-carousel-preview">
				{ images.map( ( image, index ) => {
					console.log( image );
					return (
						<amp-img
							layout="flex-item"
							height="150"
							on={ `tap:${ carouselId }.goToSlide(index=${ index })` }
							src={ image.url }
							alt={ image.alt }
							data-link={ image.link }
							key={ image.id || image.url }
							data-id={ image.id }
							class={ classnames( 'coblocks--item-thumbnail',	{ [ `wp-image-${ image.id }` ]: image.id } ) }
						></amp-img>
					);
				} ) }
			</div>

		);
	};

	return (
		<div className={ classes }>
			<div className={ innerClasses }>
				<amp-carousel
					lightbox={ lightbox ? carouselId : undefined }
					id={ carouselId }
					height={ responsiveHeight ? null : height }
					layout={ responsiveHeight ? 'fill' : 'fixed-height' }
					type="slides"
					role="region"
					aria-label={ __( 'Carousel', 'coblocks' ) }
					class={ className }
					autoplay={ autoPlay }
					delay={ autoPlaySpeed }
					loop
				>
					{ images.map( ( img, index ) => {
						const ariaLabel = sprintf(
							/* translators: %1$d is the order number of the image, %2$d is the total number of images */
							__( 'image %1$d of %2$d in gallery', 'coblocks' ),
							( index + 1 ),
							images.length
						);

						return (
							<div key={ img.id || img.url } className="coblocks-gallery--item">
								<amp-img
									src={ img.url }
									height={ responsiveHeight ? null : height }
									alt={ img.alt }
									id={ img.id }
									key={ img.id || img.url }
									aria-label={ ariaLabel }
									data-id={ img.id }
								></amp-img>
							</div>
						);
					} ) }
				</amp-carousel>
			</div>
			{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } /> }
			{ !! thumbnails && renderAmpCarouselThumnails() }
		</div>
	);
};

export default save;

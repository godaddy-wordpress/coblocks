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
import { __ } from '@wordpress/i18n';

const save = (props) => {
	const { attributes, className } = props;

	const {
		align,
		autoPlay,
		autoPlaySpeed,
		draggable,
		gutter,
		images,
		pauseHover,
		prevNextButtons,
		thumbnails,
		responsiveHeight,
		lightbox,
		pageDots,
		gutterMobile,
		height,
	} = attributes;

	if ( images.length <= 0 ) {
		return null;
	}

	const classes = classnames(
		className, 
		{
			'has-responsive-height': responsiveHeight,
		}
	);

	const innerClasses = classnames(
		'is-cropped',
		...GalleryClasses( attributes ), {
			[ `align${ align }` ]: align,
			'has-horizontal-gutter': gutter > 0,
			'has-lightbox': lightbox,
			'has-no-dots': ! pageDots,
		 	'has-no-arrows': ! prevNextButtons,
			'has-no-thumbnails': ! thumbnails,
		}
	);

	const figureClasses = classnames(
		'coblocks-gallery--figure', {
			[ `has-margin-left-${ gutter }` ]: gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			[ `has-margin-right-${ gutter }` ]: gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	const swiperStyles = { height: height ? `${height}px` : undefined };

	const uuid = '12345';

	const swiperOptions = {
		autoPlaySpeed,
		autoPlay,
		pauseHover,
		draggable,
		navigation: prevNextButtons,
		uuid,
		thumbnails,
	}

	const galleryCarousel = (
		<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) } className={ classes } >
			<div className={ innerClasses }>
				<div className="coblocks-swiper-container">
					<div className="swiper-container" id={uuid} data-swiper={JSON.stringify(swiperOptions)} style={ responsiveHeight ? undefined : swiperStyles } >
						<div className="swiper-wrapper" id='swiper-wrapper'>
							{images.map((image, index) => {
								const ariaLabel = sprintf(
									/* translators: %1$d is the order number of the image, %2$d is the total number of images */
									__( 'image %1$d of %2$d in gallery', 'coblocks' ),
									( index + 1 ),
									images.length
								);

								return (
									<div className="swiper-slide">
										<div 
											className="coblocks-gallery--item" 
											role="button" 
											tabIndex={index}
										>
											<figure className={ figureClasses }>
												<img 
													src={ image.url } 
													alt={ image.alt } 
													data-id={ image.id } 
													data-link={ image.link } 
													className={ image.id ? `wp-image-${ image.id }` : null } 
												/>
                            				</figure>	
										</div>
									</div>
								);
							})}
						</div>
						{prevNextButtons && (
							<>
								<button id={`${uuid}-prev`} className={`nav-button__prev`} >
									<svg className="icon" style={{ transform: 'rotate(180deg)' }} />
									</button>
								<button id={`${uuid}-next`} className={`nav-button__next`} >
									<svg className="icon" />
								</button>
							</>
						)}
					</div>
					{thumbnails && (
						<div className="wp-block-coblocks-gallery-carousel-thumbnail-pagination">
							{images.map((item, index) => (
								<div id={`wp-block-coblocks-gallery-carousel-thumbnail-${ index }`} className={'wp-block-coblocks-gallery-carousel-thumbnail'} style={{ height: '80px', width: '100px' }} >
									<img 
										src={ item.url } 
										alt={ item.alt } 
										data-link={ item.link } 
										data-id={ item.id } 
										style={{ height: '100%', width: '100%' }} 
									/>	
								</div>
							))}
						</div>
					)}
				</div>
			</div>	
		</div>
	);

	return galleryCarousel;

}

export default save;

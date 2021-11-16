/**
 * External dependencies
 */
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const save = ( props ) => {
	const { attributes } = props;

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
		loop,
		pageDots,
		gutterMobile,
		height,
		alignCells,
		gridSize,
	} = attributes;

	if ( images.length <= 0 ) {
		return null;
	}

	const innerClasses = classnames(
		'is-cropped',
		...GalleryClasses( attributes ),
		{
			[ `align${ align }` ]: align,
			'has-horizontal-gutter': gutter > 0,
			'has-lightbox': lightbox,
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

	const thumbnailClasses = classnames(
		'wp-block-coblocks-gallery-carousel-thumbnail',
		{
			[ `has-margin-left-${ gutter }` ]: gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			[ `has-margin-right-${ gutter }` ]: gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	const thumbnailContainerClasses = classnames(
		"wp-block-coblocks-gallery-carousel-thumbnail-pagination",
		{
			[ `has-margin-top-${ gutter }` ]: gutter > 0,
			[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	)

	const captionClasses = classnames(
		'coblocks-gallery--caption',
		'coblocks-gallery--primary-caption', {}
	);

	const swiperClasses = classnames(
		'swiper-container',
		'has-carousel',
		`has-carousel-${ gridSize }`,
		{
			'has-aligned-cells': alignCells,
			'has-responsive-height': responsiveHeight,
		}
	);

	const swiperStyles = {
		height: height ? `${ height }px` : undefined,
	};

	const uuid = '12345';

	const swiperSizing = {
		lrg: 2,
		med: 4,
		sml: 5,
		xlrg: 1,
	};

	const swiperOptions = {
		autoPlay,
		autoPlaySpeed,
		draggable,
		loop,
		navigation: prevNextButtons,
		pageDots,
		pauseHover,
		slidesPerView: swiperSizing[ gridSize ],
		thumbnails,
		uuid,
	};

	const galleryCarousel = (
		<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) } >
			<div className={ innerClasses }>
				<div className="coblocks-swiper-container">
					<div className={ swiperClasses } data-swiper={ JSON.stringify( swiperOptions ) } id={ uuid } style={ responsiveHeight ? undefined : swiperStyles } >
						<div className="swiper-wrapper" id="swiper-wrapper">
							{ images.map( ( image, index ) => {
								return (
									<div className="swiper-slide" key={ index }>
										<div
											className="coblocks-gallery--item"
											role="button"
											tabIndex={ index }
										>
											<figure className={ figureClasses }>
												<img
													alt={ image.alt }
													className={ image.id ? `wp-image-${ image.id }` : null }
													data-id={ image.id }
													data-link={ image.link }
													src={ image.url }
												/>
											</figure>
											<RichText.Content className={ captionClasses } tagName="figcaption" value={ image.caption } />
										</div>
									</div>
								);
							} ) }
						</div>
						{ prevNextButtons && (
							<>
								<button className={ `nav-button__prev` } id={ `${ uuid }-prev` } >
									<svg className="icon" style={ { transform: 'rotate(180deg)' } } />
								</button>
								<button className={ `nav-button__next` } id={ `${ uuid }-next` } >
									<svg className="icon" />
								</button>
							</>
						) }
					 </div>
					 { thumbnails && (
						<div className={ thumbnailContainerClasses }>
							{ images.map( ( item, index ) => {
								return (
									<div className={ thumbnailClasses } id={ `wp-block-coblocks-gallery-carousel-thumbnail-${ index }` } key={ index } style={ { height: '80px', width: '100px' } } >
										<img
											alt={ item.alt }
											data-id={ item.id }
											data-link={ item.link }
											src={ item.url }
											style={ { height: '100%', width: '100%' } }
										/>
									</div>
								);
							} ) }
						</div>
					) }
					{ ! thumbnails && pageDots && (
						<div className="wp-block-coblocks-gallery-carousel-page-dot-pagination-container">
							<div className="wp-block-coblocks-gallery-carousel-page-dot-wrapper" >
								{ images.map( ( item, index ) => (
									<div className="wp-block-coblocks-gallery-carousel-page-dot-pagination" id={ `wp-block-coblocks-gallery-carousel-page-dot-${ index }` } key={ index } />
								) ) }
							</div>
						</div>
					) }
				</div>
			</div>
		</div>
	);

	return galleryCarousel;
};

export default save;

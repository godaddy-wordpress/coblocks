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

	const captionClasses = classnames(
		'coblocks-gallery--caption',
		'coblocks-gallery--primary-caption', {}
	);

	const swiperClasses = classnames(
		'swiper-container',
		'has-carousel',
		`has-carousel-${ gridSize }`,
		{
			'has-responsive-height': responsiveHeight,
			'has-aligned-cells': alignCells,
		}
	);

	const swiperStyles = {
		height: height ? `${ height }px` : undefined,
	};

	const uuid = '12345';

	const swiperSizing = {
		sml: 5,
		med: 4,
		lrg: 2,
		xlrg: 1,
	};

	const swiperOptions = {
		autoPlaySpeed,
		autoPlay,
		pauseHover,
		draggable,
		navigation: prevNextButtons,
		uuid,
		thumbnails,
		pageDots,
		slidesPerView: swiperSizing[ gridSize ],
	};

	const galleryCarousel = (
		<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) } >
			<div className={ innerClasses }>
				<div className="coblocks-swiper-container">
					<div className={ swiperClasses } id={ uuid } data-swiper={ JSON.stringify( swiperOptions ) } style={ responsiveHeight ? undefined : swiperStyles } >
						<div className="swiper-wrapper" id="swiper-wrapper">
							{ images.map( ( image, index ) => {
								return (
									<div key={ index } className="swiper-slide">
										<div
											className="coblocks-gallery--item"
											role="button"
											tabIndex={ index }
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
											<RichText.Content tagName="figcaption" className={ captionClasses } value={ image.caption } />
										</div>
									</div>
								);
							} ) }
						</div>
						{ prevNextButtons && (
							<>
								<button id={ `${ uuid }-prev` } className={ `nav-button__prev` } >
									<svg className="icon" style={ { transform: 'rotate(180deg)' } } />
								</button>
								<button id={ `${ uuid }-next` } className={ `nav-button__next` } >
									<svg className="icon" />
								</button>
							</>
						) }
					 </div>
					 { thumbnails && (
						<div className="wp-block-coblocks-gallery-carousel-thumbnail-pagination">
							{ images.map( ( item, index ) => {
								return (
									<div key={ index } id={ `wp-block-coblocks-gallery-carousel-thumbnail-${ index }` } className={ 'wp-block-coblocks-gallery-carousel-thumbnail' } style={ { height: '80px', width: '100px' } } >
										<img
											src={ item.url }
											alt={ item.alt }
											data-link={ item.link }
											data-id={ item.id }
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
									<div key={ index } id={ `wp-block-coblocks-gallery-carousel-page-dot-${ index }` } className="wp-block-coblocks-gallery-carousel-page-dot-pagination" />
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

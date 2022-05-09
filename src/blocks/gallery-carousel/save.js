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
		autoPlay,
		autoPlaySpeed,
		draggable,
		gutter,
		images,
		pauseHover,
		freeScroll,
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
		navForClass,
	} = attributes;

	if ( images.length <= 0 ) {
		return null;
	}

	const innerClasses = classnames(
		'coblocks-gallery-carousel-swiper-container',
		'is-cropped',
		...GalleryClasses( attributes ),
		{
			'has-horizontal-gutter': gutter > 0,
			'has-lightbox': lightbox,
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

	const thumbnailClasses = ( index ) => (
		classnames(
			'wp-block-coblocks-gallery-carousel-thumbnail',
			`wp-block-coblocks-gallery-carousel-thumbnail-${ index }`,
			{
				[ `has-margin-left-${ gutter }` ]: gutter > 0,
				[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				[ `has-margin-right-${ gutter }` ]: gutter > 0,
				[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		)
	);

	const thumbnailContainerClasses = classnames(
		'wp-block-coblocks-gallery-carousel-thumbnail-pagination',
		{
			[ `has-margin-top-${ gutter }` ]: gutter > 0,
			[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	const captionClasses = classnames(
		'coblocks-gallery--caption',
		'coblocks-gallery--primary-caption', {}
	);

	const swiperClasses = classnames(
		'has-carousel',
		`has-carousel-${ gridSize }`,
		'swiper-container',
		{
			'has-aligned-cells': alignCells,
			'has-responsive-height': responsiveHeight,
			[ navForClass ]: thumbnails,
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
		alignCells,
		autoPlay,
		autoPlaySpeed,
		draggable,
		freeScroll,
		loop,
		navigation: prevNextButtons,
		pageDots,
		pauseHover,
		responsiveHeight,
		slidesPerView: swiperSizing[ gridSize ],
		thumbnails,
		uuid,
	};

	return (
		<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) } >
			<div className={ innerClasses }>
				<div className={ swiperClasses } data-swiper={ JSON.stringify( swiperOptions ) } id={ uuid } style={ responsiveHeight ? undefined : swiperStyles } >
					<div className="swiper-wrapper">
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
								<button aria-label={ __( 'gallery thumbnail', 'coblocks' ) } className={ thumbnailClasses( index ) } key={ index } style={ { height: '80px', width: '100px' } } tabIndex="0" >
									<img
										alt={ item.alt }
										data-id={ item.id }
										data-link={ item.link }
										src={ item.url }
										style={ { height: '100%', width: '100%' } }
									/>
								</button>
							);
						} ) }
					</div>
				) }
			</div>
		</div>
	);
};

export default save;

/* eslint-disable sort-keys */
/* eslint-disable react/jsx-sort-props */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { BackgroundAttributes, BackgroundClasses, BackgroundStyles } from '../../components/background';
import { GalleryAttributes, GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { getColorClassName, RichText } from '@wordpress/block-editor';

const deprecated =
[
	{
		attributes: {
			...GalleryAttributes,
			...BackgroundAttributes,
			...metadata.attributes,
		},
		save( { attributes, className } ) {
			const {
				autoPlay,
				autoPlaySpeed,
				draggable,
				freeScroll,
				gridSize,
				gutter,
				gutterMobile,
				height,
				images,
				pageDots,
				pauseHover,
				prevNextButtons,
				primaryCaption,
				alignCells,
				thumbnails,
				responsiveHeight,
				lightbox,
				navForClass,
			} = attributes;

			// Return early if there are no images.
			if ( images.length <= 0 ) {
				return;
			}

			const classes = classnames(
				className, {
					'has-responsive-height': responsiveHeight,
				}
			);

			const innerClasses = classnames(
				'is-cropped',
				...GalleryClasses( attributes ), {
					'has-horizontal-gutter': gutter > 0,
					'has-lightbox': lightbox,
				}
			);

			const flickityClasses = classnames(
				'has-carousel',
				`has-carousel-${ gridSize }`, {
					'has-aligned-cells': alignCells,
					[ `has-margin-bottom-${ gutter }` ]: thumbnails && gutter > 0,
					[ `has-margin-bottom-mobile-${ gutterMobile }` ]: thumbnails && gutterMobile > 0,
					[ navForClass ]: thumbnails,
				}
			);

			const flickityStyles = {
				height: height ? height + 'px' : undefined,
			};

			const figureClasses = classnames(
				'coblocks-gallery--figure', {
					[ `has-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const flickityOptions = {
				arrowShape: {
					x0: 10,
					x1: 60,
					x2: 65,
					x3: 20,
					y1: 50,
					y2: 45,
				},
				autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
				cellAlign: alignCells ? 'left' : 'center',
				draggable,
				freeScroll,
				pageDots,
				pauseAutoPlayOnHover: pauseHover,
				prevNextButtons,
				responsiveHeight,
				thumbnails,
				wrapAround: true,
			};

			const captionClasses = classnames(
				'coblocks-gallery--caption',
				'coblocks-gallery--primary-caption', {}
			);

			const navClasses = classnames(
				'carousel-nav', {
					[ `has-margin-top-${ gutter }` ]: gutter > 0,
					[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-negative-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-negative-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-negative-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-negative-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const navFigureClasses = classnames(
				'coblocks--figure', {
					[ `has-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const navOptions = {
				asNavFor: `.${ navForClass }`,
				autoPlay: false,
				cellAlign: 'left',
				contain: true,
				draggable,
				pageDots: false,
				prevNextButtons: false,
				thumbnails: false,
				wrapAround: false,
			};

			return (
				<div className={ classes }>
					<div className={ innerClasses }>
						<div
							className={ flickityClasses }
							data-flickity={ JSON.stringify( flickityOptions ) }
							style={ responsiveHeight ? undefined : flickityStyles }
						>
							{ images.map( ( image ) => {
								const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-link={ image.link } src={ image.url } />;

								return (
									<div className="coblocks-gallery--item" key={ image.id || image.url }>
										<figure className={ figureClasses }>
											{ img }
										</figure>
									</div>
								);
							} ) }
						</div>
						{ thumbnails
							? (
								<div
									className={ navClasses }
									data-flickity={ JSON.stringify( navOptions ) }
								>
									{ images.map( ( image ) => {
										const img = <img alt={ image.alt } data-id={ image.id } data-link={ image.link } src={ image.url } />;
										return (
											<div className="coblocks--item-thumbnail" key={ image.id || image.url }>
												<figure className={ navFigureClasses }>
													{ img }
												</figure>
											</div>
										);
									} ) }
								</div> ) : null
						}
					</div>
					{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content className={ captionClasses } tagName="figcaption" value={ primaryCaption } /> }
				</div>
			);
		},
	},
	{
		attributes: {
			...GalleryAttributes,
			...BackgroundAttributes,
			...metadata.attributes,
		},
		save( { attributes, className } ) {
			const {
				align,
				alignCells,
				autoPlay,
				autoPlaySpeed,
				backgroundPadding,
				backgroundPaddingMobile,
				captionStyle,
				customCaptionColor,
				draggable,
				filter,
				freeScroll,
				gridSize,
				gutter,
				gutterMobile,
				height,
				images,
				pageDots,
				pauseHover,
				prevNextButtons,
				primaryCaption,
				radius,
				responsiveHeight,
				thumbnails,
			} = attributes;

			// Return early if there are no images.
			if ( images.length <= 0 ) {
				return;
			}

			const captionColorClass = getColorClassName( 'color', attributes.captionColor );

			const galleryClassesDeprecated = classnames(
				'coblocks-gallery', {
					captionColorClass,
					[ `has-background-border-radius-${ attributes.backgroundRadius }` ]: attributes.backgroundRadius > 0,
					[ `has-border-radius-${ radius }` ]: radius > 0,
					'has-caption-color': captionColorClass || customCaptionColor,
					[ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined,
					[ `has-filter-${ filter }` ]: filter !== 'none',
					'has-no-alignment': ! align,
					'has-padding': backgroundPadding > 0,
					[ `has-padding-${ backgroundPadding }` ]: backgroundPadding > 0,
					[ `has-padding-mobile-${ backgroundPaddingMobile }` ]: backgroundPaddingMobile > 0,
				}
			);

			const classes = classnames(
				className, {
					'has-responsive-height': responsiveHeight,
				}
			);

			const innerClasses = classnames(
				'is-cropped',
				galleryClassesDeprecated,
				...BackgroundClasses( attributes ), {
					'has-horizontal-gutter': gutter > 0,

				}
			);

			const innerStyles = {
				...BackgroundStyles( attributes ),
			};

			const flickityClasses = classnames(
				'has-carousel',
				`has-carousel-${ gridSize }`, {
					'has-aligned-cells': alignCells,
					[ `has-margin-bottom-${ gutter }` ]: thumbnails && gutter > 0,
					[ `has-margin-bottom-mobile-${ gutterMobile }` ]: thumbnails && gutterMobile > 0,
				}
			);

			const flickityStyles = {
				height: height ? height + 'px' : undefined,
			};

			const figureClasses = classnames(
				'coblocks-gallery--figure', {
					[ `has-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const flickityOptions = {
				arrowShape: {
					x0: 10,
					x1: 60,
					x2: 65,
					x3: 20,
					y1: 50,
					y2: 45,
				},
				autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
				cellAlign: alignCells ? 'left' : 'center',
				draggable,
				freeScroll,
				pageDots,
				pauseAutoPlayOnHover: pauseHover,
				prevNextButtons,
				responsiveHeight,
				thumbnails,
				wrapAround: true,
			};

			const captionClasses = classnames(
				'coblocks-gallery--caption',
				'coblocks-gallery--primary-caption',
				captionColorClass, {
					'has-caption-color': captionColorClass,

				}
			);

			const navClasses = classnames(
				'carousel-nav', {
					[ `has-margin-top-${ gutter }` ]: gutter > 0,
					[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-negative-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-negative-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-negative-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-negative-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const navFigureClasses = classnames(
				'coblocks--figure', {
					[ `has-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const navOptions = {
				asNavFor: '.has-carousel',
				autoPlay: false,
				cellAlign: 'left',
				contain: true,
				draggable,
				pageDots: false,
				prevNextButtons: false,
				thumbnails: false,
				wrapAround: false,
			};

			const captionStyles = {
				color: captionColorClass ? undefined : customCaptionColor,
			};

			return (
				<div className={ classes }>
					<div
						className={ innerClasses }
						style={ innerStyles }
					>
						<div
							className={ flickityClasses }
							data-flickity={ JSON.stringify( flickityOptions ) }
							style={ responsiveHeight ? undefined : flickityStyles }
						>
							{ images.map( ( image ) => {
								const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-link={ image.link } src={ image.url } />;

								return (
									<div className="coblocks-gallery--item" key={ image.id || image.url }>
										<figure className={ figureClasses }>
											{ img }
										</figure>
									</div>
								);
							} ) }
						</div>
						{ thumbnails
							? (
								<div
									className={ navClasses }
									data-flickity={ JSON.stringify( navOptions ) }
								>
									{ images.map( ( image ) => {
										const img = <img alt={ image.alt } data-id={ image.id } data-link={ image.link } src={ image.url } />;
										return (
											<div className="coblocks--item-thumbnail" key={ image.id || image.url }>
												<figure className={ navFigureClasses }>
													{ img }
												</figure>
											</div>
										);
									} ) }
								</div> ) : null
						}
					</div>
					{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content className={ captionClasses } style={ captionStyles } tagName="figcaption" value={ primaryCaption } /> }
				</div>
			);
		},
	},
	{
		attributes: {
			...GalleryAttributes,
			...BackgroundAttributes,
			...metadata.attributes,
		},
		save( { attributes, className } ) {
			const {
				autoPlay,
				autoPlaySpeed,
				captionColor,
				customCaptionColor,
				draggable,
				freeScroll,
				gridSize,
				gutter,
				gutterMobile,
				height,
				images,
				pageDots,
				pauseHover,
				prevNextButtons,
				primaryCaption,
				alignCells,
				thumbnails,
				responsiveHeight,
			} = attributes;

			const innerClasses = classnames(
				'is-cropped',
				...GalleryClasses( attributes ),
				...BackgroundClasses( attributes ), {
					'has-horizontal-gutter': gutter > 0,

				}
			);

			const innerStyles = {
				...BackgroundStyles( attributes ),
			};

			const flickityClasses = classnames(
				'has-carousel',
				`has-carousel-${ gridSize }`, {
					'has-aligned-cells': alignCells,
				}
			);

			const flickityStyles = {
				height: height ? height + 'px' : undefined,
			};

			const figureClasses = classnames(
				'coblocks-gallery--figure', {
					[ `has-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const flickityOptions = {
				arrowShape: {
					x0: 10,
					x1: 60,
					x2: 65,
					x3: 20,
					y1: 50,
					y2: 45,

				},
				autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
				cellAlign: alignCells ? 'left' : 'center',
				draggable,
				freeScroll,
				pageDots,
				pauseAutoPlayOnHover: pauseHover,
				prevNextButtons,
				responsiveHeight,
				thumbnails,
				wrapAround: true,
			};

			const captionColorClass = getColorClassName( 'color', captionColor );

			const captionClasses = classnames(
				'coblocks-gallery--caption',
				'coblocks-gallery--primary-caption',
				captionColorClass, {
					'has-caption-color': captionColorClass,

				}
			);

			const captionStyles = {
				color: captionColorClass ? undefined : customCaptionColor,
			};

			return (
				<div className={ className }>
					<div
						className={ innerClasses }
						style={ innerStyles }
					>
						<div
							className={ flickityClasses }
							data-flickity={ JSON.stringify( flickityOptions ) }
							style={ flickityStyles }
						>
							{ images.map( ( image ) => {
								const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-link={ image.link } src={ image.url } />;

								return (
									<div className="coblocks-gallery--item" key={ image.id || image.url }>
										<figure className={ figureClasses }>
											{ img }
										</figure>
									</div>
								);
							} ) }
						</div>
					</div>
					{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content className={ captionClasses } style={ captionStyles } tagName="figcaption" value={ primaryCaption } /> }
				</div>
			);
		},
	},
	{
		attributes: {
			...GalleryAttributes,
			...BackgroundAttributes,
			...metadata.attributes,
		},
		save( { attributes, className } ) {
			const {
				autoPlay,
				autoPlaySpeed,
				captionColor,
				customCaptionColor,
				draggable,
				gridSize,
				gutter,
				gutterMobile,
				height,
				images,
				pageDots,
				prevNextButtons,
				primaryCaption,
			} = attributes;

			// Return early if there are no images.
			if ( images.length <= 0 ) {
				return;
			}

			const innerClasses = classnames(
				'is-cropped',
				...GalleryClasses( attributes ), {
					'has-horizontal-gutter': gutter > 0,
				}
			);

			const innerStyles = {
				...BackgroundStyles( attributes ),
			};

			const flickityClasses = classnames(
				'has-carousel',
				`has-carousel-${ gridSize }`, {}
			);

			const flickityStyles = {
				height: height ? height + 'px' : undefined,
			};

			const figureClasses = classnames(
				'coblocks-gallery--figure', {
					[ `has-margin-left-${ gutter }` ]: gutter > 0,
					[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					[ `has-margin-right-${ gutter }` ]: gutter > 0,
					[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				}
			);

			const flickityOptions = {
				arrowShape: {
					x0: 10,
					x1: 60,
					x2: 65,
					x3: 20,
					y1: 50,
					y2: 45,
				},
				autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
				draggable,
				pageDots,
				prevNextButtons,
				wrapAround: true,
			};

			const captionColorClass = getColorClassName( 'color', captionColor );

			const captionClasses = classnames(
				'coblocks-gallery--caption',
				'coblocks-gallery--primary-caption',
				captionColorClass, {
					'has-caption-color': captionColorClass,

				}
			);

			const captionStyles = {
				color: captionColorClass ? undefined : customCaptionColor,
			};

			return (
				<div className={ className }>
					<div
						className={ innerClasses }
						style={ innerStyles }
					>
						<div
							className={ flickityClasses }
							data-flickity={ JSON.stringify( flickityOptions ) }
							style={ flickityStyles }
						>
							{ images.map( ( image ) => {
								const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-link={ image.link } src={ image.url } />;

								return (
									<div className="coblocks-gallery--item" key={ image.id || image.url }>
										<figure className={ figureClasses }>
											{ img }
										</figure>
									</div>
								);
							} ) }
						</div>
					</div>
					{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content className={ captionClasses } style={ captionStyles } tagName="figcaption" value={ primaryCaption } /> }
				</div>
			);
		},
	},
	{
		attributes: {
			...GalleryAttributes,
			...BackgroundAttributes,
			...metadata.attributes,
		},
		save( { attributes } ) {
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
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...GalleryAttributes,
			...BackgroundAttributes,
			...metadata.attributes,
		},
		save: ( { attributes } ) => {
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

			const thumbnailClasses = ( index ) => {
				return classnames(
					'wp-block-coblocks-gallery-carousel-thumbnail',
					`wp-block-coblocks-gallery-carousel-thumbnail-${ index }`,
					{
						[ `has-margin-left-${ gutter }` ]: gutter > 0,
						[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
						[ `has-margin-right-${ gutter }` ]: gutter > 0,
						[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					}
				);
			};

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
						<div className={ swiperClasses } data-swiper={ JSON.stringify( swiperOptions ) } id={ uuid } style={ swiperStyles } >
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
										<div className={ thumbnailClasses( index ) } key={ index } style={ { height: '80px', width: '100px' } } >
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
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...GalleryAttributes,
			...metadata.attributes,
			freeScroll: {
				type: 'boolean',
				default: false,
			},
		},
		save: ( { attributes } ) => {
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

			const thumbnailClasses = ( index ) => {
				return classnames(
					'wp-block-coblocks-gallery-carousel-thumbnail',
					`wp-block-coblocks-gallery-carousel-thumbnail-${ index }`,
					{
						[ `has-margin-left-${ gutter }` ]: gutter > 0,
						[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
						[ `has-margin-right-${ gutter }` ]: gutter > 0,
						[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
					}
				);
			};

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
						<div className={ swiperClasses } data-swiper={ JSON.stringify( swiperOptions ) } id={ uuid } style={ swiperStyles } >
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
		},
	},
];

export default deprecated;

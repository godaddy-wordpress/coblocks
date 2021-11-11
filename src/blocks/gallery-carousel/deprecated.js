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
[ {
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
			<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) }
				className={ classes }>
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
];

export default deprecated;

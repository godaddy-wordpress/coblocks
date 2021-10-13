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
import { __ } from '@wordpress/i18n';

const save = ( { attributes, className } ) => {
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
		autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
		draggable,
		pageDots,
		prevNextButtons,
		wrapAround: true,
		cellAlign: alignCells ? 'left' : 'center',
		pauseAutoPlayOnHover: pauseHover,
		freeScroll,
		arrowShape: {
			x0: 10,
			x1: 60, y1: 50,
			x2: 65, y2: 45,
			x3: 20,
		},
		thumbnails,
		responsiveHeight,
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
		contain: true,
		cellAlign: 'left',
		pageDots: false,
		thumbnails: false,
		draggable,
		prevNextButtons: false,
		wrapAround: false,
	};

	return (
		<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) }
			className={ classes }>
			<div className={ innerClasses }>
				<div
					className={ flickityClasses }
					style={ responsiveHeight ? undefined : flickityStyles }
					data-flickity={ JSON.stringify( flickityOptions ) }
				>
					{ images.map( ( image ) => {
						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

						return (
							<div key={ image.id || image.url } className="coblocks-gallery--item">
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
								const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } />;
								return (
									<div key={ image.id || image.url } className="coblocks--item-thumbnail">
										<figure className={ navFigureClasses }>
											{ img }
										</figure>
									</div>
								);
							} ) }
						</div> ) : null
				}
			</div>
			{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } /> }
		</div>
	);
};

export default save;

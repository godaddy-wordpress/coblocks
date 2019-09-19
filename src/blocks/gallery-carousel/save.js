/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import { BackgroundStyles, BackgroundClasses } from '../../components/background';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
const { getColorClassName, RichText } = wp.blockEditor;

const save = ( { attributes, className } ) => {
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
		thumbnails,
		responsiveHeight,
		prevNextButtons,
		primaryCaption,
		alignCells,
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
			[ `has-margin-bottom-${ gutter }` ] : thumbnails && gutter > 0,
			[ `has-margin-bottom-mobile-${ gutterMobile }` ] : thumbnails && gutterMobile > 0,
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
		draggable: draggable,
		pageDots: pageDots,
		thumbnails: thumbnails,
		responsiveHeight: responsiveHeight,
		prevNextButtons: prevNextButtons,
		wrapAround: true,
		cellAlign: alignCells ? 'left' : 'center',
		pauseAutoPlayOnHover: pauseHover,
		freeScroll: freeScroll,
		arrowShape: {
			x0: 10,
			x1: 60, y1: 50,
			x2: 65, y2: 45,
			x3: 20,
		},
	};

	const captionColorClass = getColorClassName( 'color', captionColor );

	const captionClasses = classnames(
		'coblocks-gallery--caption',
		'coblocks-gallery--primary-caption',
		captionColorClass, {
			'has-caption-color': captionColorClass,

		}
	);

	const navClasses = classnames(
		'carousel-nav has-thumbnails-med', {
			[ `has-margin-top-${ gutter }` ] : gutter > 0,
			[ `has-margin-top-mobile-${ gutterMobile }` ] : gutterMobile > 0,
			[ `has-negative-margin-left-${ gutter }` ] : gutter > 0,
			[ `has-negative-margin-left-mobile-${ gutterMobile }` ] : gutterMobile > 0,
			[ `has-negative-margin-right-${ gutter }` ] : gutter > 0,
			[ `has-negative-margin-right-mobile-${ gutterMobile }` ] : gutterMobile > 0,
		}
	);

	const navFigureClasses = classnames(
		'blockgallery--figure', {
			[ `has-margin-left-${ gutter }` ] : gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ] : gutterMobile > 0,
			[ `has-margin-right-${ gutter }` ] : gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ] : gutterMobile > 0,
		}
	);

	const navOptions = {
		asNavFor: '.has-carousel',
		autoPlay: false,
		contain: true,
		cellAlign: 'left',
		pageDots: false,
		thumbnails: false,
		draggable: draggable,
		prevNextButtons: false,
		wrapAround: false,
	};

	const captionStyles = {
		color: captionColorClass ? undefined : customCaptionColor,
	};

	// Return early if there are no images.
	if ( images.length <= 0 ) {
		return;
	}

	return (
		<div className={ className }>
			<div
				className={ innerClasses }
				style={ innerStyles }
			>
				<div
					className={ flickityClasses }
					style={ flickityStyles }
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
				{ thumbnails ?
					<div
						className={ navClasses }
						data-flickity={ JSON.stringify( navOptions ) }
					>
						{ images.map( ( image ) => {
							const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } />;
							return (
								<div key={ image.id || image.url } className="blockgallery--item-thumbnail">
									<figure className={ navFigureClasses }>
										{ img }
									</figure>
								</div>
							);
						} ) }
					</div> : null
				}
			</div>
			{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } style={ captionStyles } /> }
		</div>
	);
};

export default save;

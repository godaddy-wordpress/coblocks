/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundAttributes, BackgroundStyles } from '../../components/background';
import { GalleryAttributes, GalleryClasses } from '../../components/block-gallery/shared';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { getColorClassName, RichText } = wp.blockEditor;

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
			autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
			draggable: draggable,
			pageDots: pageDots,
			prevNextButtons: prevNextButtons,
			wrapAround: true,
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
				</div>
				{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } style={ captionStyles } /> }
			</div>
		);
	},
},
];

export default deprecated;

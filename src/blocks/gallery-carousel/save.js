/**
 * External dependencies
 */
import classnames from 'classnames';
import ReactDOMServer from 'react-dom/server';

/**
 * Internal dependencies
 */
 import GalleryImage from '../../components/block-gallery/gallery-image';
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
		primaryCaption,
		thumbnails,
		responsiveHeight,
		lightbox,
		pageDots,
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

	const uuid = '12345';

	const galleryCarousel = (
		<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) } className={ classes } >
			<div className={ innerClasses }>
				<div className="coblocks-swiper-container">
					<div className="swiper-container" id={uuid}>
						<div className="swiper-wrapper" id='swiper-wrapper'>
							{images.map((item, index) => {
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
											style={{ pointerEvents: 'none', touchAction: 'none' }}
										>
											<GalleryImage
												url={ item.url }
												alt={ item.alt }
												id={ item.id }
												marginRight={ true }
												marginLeft={ true }
												onSelect={() => {
													
												}}
												aria-label={ ariaLabel }
												supportsCaption={ false }
												supportsMoving={ false }
												imageIndex={ index }      								
											/>	
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>	
		</div>
	);

	// console.log('save html', ReactDOMServer.renderToStaticMarkup(galleryCarousel));

	return galleryCarousel;

}

export default save;

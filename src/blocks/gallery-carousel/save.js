/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { GalleryClasses } from '../../components/block-gallery/shared';
import Swiper from '../../components/Swiper';
import GalleryCarouselItem from './gallery-carousel-item';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = ( { attributes, className } ) => {
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

	return (
		<div aria-label={ __( `Carousel Gallery`, 'coblocks' ) } className={ classes } >
			<div className={ innerClasses }>
				<Swiper
				    uuid={'12345'}
					list={images}
					navigation={prevNextButtons}
					isDraggable={draggable}
					autoPlaySpeed={autoPlay ? autoPlaySpeed : null}
					pauseHover={autoPlay ? pauseHover : null}
				>
					{({
						index,
					}) => {
						const ariaLabel = sprintf(
							/* translators: %1$d is the order number of the image, %2$d is the total number of images */
							__( 'image %1$d of %2$d in gallery', 'coblocks' ),
							( index + 1 ),
							images.length
						);
						
						return (
							<GalleryCarouselItem 
								index={index} 
								ariaLabel={ariaLabel}
							/>	
						);
					}}			
				</Swiper>
			</div>
		</div>
	);
}

export default save;

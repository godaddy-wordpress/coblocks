/**
 * External dependencies
 */
import classnames from 'classnames';
import ReactDOMServer from 'react-dom/server';
import { GalleryCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { useDispatch } from '@wordpress/data';
import { v4 as uuid } from 'uuid';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import { GalleryClasses } from '../../components/block-gallery/shared';
import { CarouselGalleryVariationPicker, hasVariationSet } from './variations';
import Swiper from '../../components/swiper';
import GalleryCarouselItem from './gallery-carousel-item';
import { GalleryContextProvider, GalleryCarouselContext } from './context';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useMemo, useContext, useState, useCallback } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { withNotices, ResizableBox } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

/**
 * Function will dynamically process a string for use with the `navForClass` block attribute.
 * This attribute should only be truthy when the corresponding `thumbnails` attribute is also set.
 *
 * @constant parseNavForClass
 * @type {Function}
 * @param {boolean} thumbnails This boolean value is equal to props.attributes.thumbnails.
 * @param {string}  clientId   This string value is equal to props.clientId.
 * @return {string} Return parsed class string if thumbnails is truthy or an empty string.
 */
export const parseNavForClass = ( thumbnails, clientId ) => thumbnails
	? `has-nav-${ clientId.split( '-' )[ 0 ] }`
	: '';

const GalleryCarouselEdit = ( props ) => {
	try {
	const { selectBlock } = useDispatch( 'core/block-editor' );

	const {
		attributes,
		className,
		isSelected,
		noticeUI,
		setAttributes,
	} = props;

	const {
		align,
		gutter,
		height,
		images,
		pageDots,
		prevNextButtons,
		thumbnails,
		responsiveHeight,
		lightbox,
		draggable,
		freeScroll,
		autoPlaySpeed,
		autoPlay,
		pauseHover,
	} = attributes;

	const { selectedImage, setSelectedImage } = useContext(GalleryCarouselContext);
	
	const innerClasses = classnames(
		'is-cropped',
		...GalleryClasses( attributes ), {
			[ `align${ align }` ]: align,
			'has-horizontal-gutter': gutter > 0,
			'has-no-dots': ! pageDots,
		 	'has-no-arrows': ! prevNextButtons,
			'is-selected': isSelected,
			'has-no-thumbnails': ! thumbnails,
			'has-lightbox': lightbox,
		}
	);

	const handleSwipe = ( newIndex ) => {
		setSelectedImage( newIndex );
	};

	const handleSelectCarousel = () => {
		if ( ! isSelected ) {
			selectBlock(props.clientId);
		}
	}

	const handleCaptionChange = (val) => {
		setAttributes({
			images: images.map((image, index) => {
				if (index === selectedImage) {
					return {
						...image,
						caption: val
					}
				}
				return image;
			})
		})
	}

	const handleRemoveImage = (removeIndex) => {
		setAttributes({
			images: images.filter((img, index) => {
				return index !== removeIndex;
			})
		})
	}

	const handleReplaceImage = ( replaceIndex, newImage ) => {
		setAttributes({
			images: images.map(( img, index ) => {
				if ( index === replaceIndex) {
					return newImage;
				}
				return img;
			})
		})
	}

	const variatonSelected = hasVariationSet( attributes );

	if ( !images.length && ! variatonSelected  ) {
		return ( 
			<CarouselGalleryVariationPicker { ...props } />
		);
	} else if ( !images.length && variatonSelected ) {
		const variationLabel = ( !! variatonSelected && variatonSelected !== 'skip' )
			? sprintf(
				/* translators: %s: Type of gallery variation */
				__( '%s Carousel', 'coblocks' ),
				variatonSelected
			) : false;

		return (
			<>
				{ noticeUI }
				<GalleryPlaceholder
					{ ...props }
					variationLabel={ variationLabel }
					label={ __( 'Carousel', 'coblocks' ) }
					icon={ <Icon icon={ icon } /> }
					gutter={ attributes.gutter }
				/>
			</>			
		);						
	}

	const renderGalleryPagination = useCallback(({ changeStep }) => {
		return (
			<div className="wp-block-coblocks-gallery-carousel-thumbnail-pagination">
				{images.map((item, index) => (
					<GalleryCarouselThumbnail 
						changeStep={changeStep} 
						index={index} 
						item={item} 
					/>
				))}
			</div>
		);
	}, [ selectedImage, images ]);

	const renderSwiper = useMemo(() => {
		return (
			<Swiper
				list={images}
				navigation={prevNextButtons}
				isDraggable={draggable}
				freeScroll={freeScroll}
				autoPlaySpeed={autoPlay ? autoPlaySpeed : null}
				pauseHover={autoPlay ? pauseHover : null}
				Pagination={thumbnails ? renderGalleryPagination : null}
				onSwipe={handleSwipe}
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
							handleRemoveImage={handleRemoveImage}
							handleReplaceImage={handleReplaceImage}
						/>	
					);
				}}			
			</Swiper>
		);
	}, [
		images,
		thumbnails,
		pauseHover, 
		prevNextButtons, 
		draggable, 
		autoPlaySpeed, 
		autoPlay 
	]);

	const renderCaption = useMemo(() => {
		return (
			<RichText
				tagName="figcaption"
				placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
				value={ images[selectedImage]?.caption }
				className="coblocks-gallery--caption coblocks-gallery--primary-caption"
				onChange={ val => handleCaptionChange(val) }
				isSelected={isSelected }
				keepPlaceholderOnFocus
				inlineToolbar   
			/>
		);
	}, [selectedImage, isSelected]);

	const defaultGalleryState = {
		isSelected,
		images,
		showThumbnails: thumbnails,
	}

	return (
		<GalleryContextProvider {...defaultGalleryState}>
			{ isSelected && (
				<>
					<Controls { ...props } />
					<Inspector { ...props } />
				</>
			) }
			{ noticeUI }
			<ResizableBox
				size={ {
					height,
					width: '100%',
				} }
				className={ classnames( {
					'is-selected': isSelected,
					'has-responsive-height': responsiveHeight,
				} ) }
				minHeight="0"
				enable={ {
					bottom: true,
					bottomLeft: false,
					bottomRight: false,
					left: false,
					right: false,
					top: false,
					topLeft: false,
					topRight: false,
				} }
				onResizeStop={ ( _event, _direction, _elt, delta ) => {
					setAttributes( {
						height: parseInt( height + delta.height, 10 ),
					} );
				} }
				showHandle={ isSelected }
				onClick={handleSelectCarousel}
			>
				<div className={ className }>
					<div className={ innerClasses }>
						{renderSwiper}
						{renderCaption}
					</div>
				</div>
			</ResizableBox>
		</GalleryContextProvider>
	);
			} catch (error) {
				console.log('getting over wordpress here', error);
			}
};

const GalleryCarouselThumbnail = ({ changeStep, item, index }) => {
	const { selectedImage } = useContext(GalleryCarouselContext);

	return (
		<div className={classnames( {
			'wp-block-coblocks-gallery-carousel-thumbnail': true,
			'is-active': index === selectedImage,
		} )} style={{ height: '80px', width: '100px' }} onClick={() => changeStep( index )} >
			<img src={ item.url } alt={ item.alt } data-link={ item.link } data-id={ item.id } style={{ height: '100%', width: '100%' }} />	
		</div>
	);
}

export default compose( [
	withNotices,
] )( GalleryCarouselEdit );

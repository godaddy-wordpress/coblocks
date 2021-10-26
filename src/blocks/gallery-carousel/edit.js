/**
 * External dependencies
 */
import ReactDOMServer from 'react-dom/server';
import classnames from 'classnames';
import filter from 'lodash/filter';
import Flickity from 'react-flickity-component';
import { GalleryCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { useDispatch } from '@wordpress/data';
import { v4 as uuid } from 'uuid';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../components/block-gallery/gallery-image';
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
import { useState, useEffect, useMemo, useContext} from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { withNotices, ResizableBox } from '@wordpress/components';

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
	const parsedNavForClass = parseNavForClass( props.attributes.thumbnails, props.clientId );

	// const [ selectedImage, setSelectedImage ] = useState( null );
	// const [ captionFocused, setCaptionFocused ] = useState( false );

	const { selectBlock } = useDispatch( 'core/block-editor' );

	// const prevSelected = usePrevious( props.isSelected );

	// useEffect( () => {
	// 	if ( ! props.isSelected && prevSelected ) {
	// 		// setSelectedImage( null );
	// 		setCaptionFocused( false );
	// 	}

	// 	if ( ! props.isSelected && prevSelected && captionFocused ) {
	// 		setCaptionFocused( false );
	// 	}
	// }, [ prevSelected, props.isSelected, captionFocused ] );

	useEffect( () => {
		if ( props.attributes.gutter <= 0 && props.attributes.radius !== 0 ) {
			props.setAttributes( { radius: 0 } );
		}
	}, [ props.attributes.gutter ] );

	useEffect( () => {
		if (
			props.attributes.gridSize === 'xlrg'
		) {
			props.setAttributes( { gutter: 0, gutterMobile: 0 } );
		}
	}, [ props.attributes.gridSize ] );

	useEffect( () => {
		if ( parsedNavForClass !== props.attributes.navForClass ) {
			setAttributes( { navForClass: parsedNavForClass } );
		}
	}, [ props.attributes.navForClass, parsedNavForClass ] );

	useEffect( () => {
		if ( !! props.attributes.thumbnails && props.attributes.pageDots ) {
			setAttributes( { pageDots: false } );
		}
	}, [ props.attributes.thumbnails, props.attributes.pageDots ] );

	const {
		attributes,
		className,
		isSelected,
		noticeUI,
		setAttributes,
	} = props;

	const {
		align,
		gridSize,
		gutter,
		gutterMobile,
		height,
		images,
		pageDots,
		prevNextButtons,
		primaryCaption,
		alignCells,
		thumbnails,
		responsiveHeight,
		lightbox,
		navForClass,
		draggable,
		freeScroll,
		autoPlaySpeed,
		autoPlay,
		pauseHover,
	} = attributes;

	console.log('prevNextButtons', prevNextButtons);

	// console.log('attributes', attributes);

	const { setSelectedImage, setCaptionFocused } = useContext(GalleryCarouselContext);
    
	const variatonSelected = hasVariationSet( attributes );

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

	const handleSwipe = ( newIndex, state ) => {
		setSelectedImage( newIndex );
	};

	const handleSelectCarousel = () => {
		if ( ! isSelected ) {
			selectBlock(props.clientId);
			setCaptionFocused(true);
		}
	}

	const hasImages = !! images.length;

	if ( 
		! hasImages && 
		! variatonSelected &&
		variatonSelected !== 'skip' 
	) {
		return ( 
			<CarouselGalleryVariationPicker { ...props } />
		 );
	}

	if ( ! hasImages ) {
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
					gutter={ gutter }
				/>
			</>
		);
	}

	console.log('images', images);

	const renderSwiper = useMemo(() => {
		const swiperCarouselUuid = uuid();

		return (
			<Swiper
				list={images}
				uuid={swiperCarouselUuid}
				navigation={prevNextButtons}
				isDraggable={draggable}
				freeScroll={freeScroll}
				autoPlaySpeed={autoPlay ? autoPlaySpeed : null}
				pauseHover={autoPlay ? pauseHover : null}
				onSwipe={handleSwipe}
				{...(thumbnails ? {
					paginationControl: {
						class: "wp-block-coblocks-gallery-carousel-thumbnail-pagination",
						render: ({ index, className: pageClassName }) => {
							const item = images[index];

							return (
								<div className={`wp-block-coblocks-gallery-carousel-thumbnail`} style={{ height: '80px', width: '100px' }} >
									<img src={ item.url } alt={ item.alt } data-link={ item.link } data-id={ item.id } style={{ height: '100%', width: '100%' }} />	
								</div>
							);
						}							
					}
				} : {})}			
			>
				{({
					item,
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
							item={item} 
							index={index} 
							ariaLabel={ariaLabel}
							isSelected={isSelected}
							setAttributes={setAttributes}
							images={images}
						/>	
					);
				}}			
			</Swiper>
		);
	}, [ isSelected ]); // going to move the isSelected to within the gallery carousel item to prevent this re-mounting the swiper

	return (
		<>
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
			>
				<div className={ className } onClick={handleSelectCarousel}>
					<div className={ innerClasses }>
						{renderSwiper}
					</div>
				</div>
			</ResizableBox>
		</>
	);
};

function withGalleryCarouselState( Component ) {
	return (props) => {
		return (
			<GalleryContextProvider>
				<Component {...props} />
			</GalleryContextProvider>
		)
	}
}

export default compose( [
	withNotices,
] )( withGalleryCarouselState(GalleryCarouselEdit) );

/**
 * External dependencies
 */
import classnames from 'classnames';
import { GalleryCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Controls from './controls';
import GalleryCarouselItem from './gallery-carousel-item';
import { GalleryClasses } from '../../components/block-gallery/shared';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import Inspector from './inspector';
import Swiper from '../../components/swiper';
import { CarouselGalleryVariationPicker, hasVariationSet } from './variations';
import { GalleryCarouselContext, GalleryContextProvider } from './context';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { Icon } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import { ResizableBox, withNotices } from '@wordpress/components';
import { useCallback, useContext, useEffect, useMemo } from '@wordpress/element';

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
		gutterMobile,
		height,
		images,
		pageDots,
		prevNextButtons,
		thumbnails,
		responsiveHeight,
		lightbox,
		loop,
		draggable,
		freeScroll,
		autoPlaySpeed,
		autoPlay,
		pauseHover,
		gridSize,
		alignCells,
	} = attributes;

	const { selectedImage, setSelectedImage } = useContext( GalleryCarouselContext );

	const swiperStyles = {
		marginTop: gutter > 0 && ! responsiveHeight ? ( gutter / 2 ) + 'px' : undefined,
	};

	useEffect( () => {
		if ( isSelected === false && selectedImage !== null ) {
			setSelectedImage( null );
		}
	}, [ isSelected ] );

	const innerClasses = classnames(
		'is-cropped',
		'has-carousel',
		`has-carousel-${ gridSize }`,
		...GalleryClasses( attributes ),
		{
			[ `align${ align }` ]: align,
			'has-aligned-cells': alignCells,
			'has-horizontal-gutter': gutter > 0,
			'has-lightbox': lightbox,
			'has-no-arrows': ! prevNextButtons,
			'has-no-thumbnails': ! thumbnails,
			'is-selected': isSelected,
		}
	);

	const handleSwipe = ( newIndex ) => {
		if ( gridSize === ' xlrg' ) {
			setSelectedImage( newIndex );
		} else {
			setSelectedImage( null );
		}
	};

	const handleSelectCarousel = () => {
		if ( ! isSelected ) {
			selectBlock( props.clientId );
		}
	};

	const handleRemoveImage = ( removeIndex ) => {
		setAttributes( {
			images: images.filter( ( img, index ) => {
				return index !== removeIndex;
			} ),
		} );
	};

	const handleReplaceImage = ( replaceIndex, newImage ) => {
		setAttributes( {
			images: images.map( ( img, index ) => {
				if ( index === replaceIndex ) {
					return newImage;
				}
				return img;
			} ),
		} );
	};

	const variatonSelected = hasVariationSet( attributes );

	const renderGalleryPagination = useCallback( ( { changeStep } ) => {
		const paginationClasses = classnames(
			'wp-block-coblocks-gallery-carousel-thumbnail-pagination',
			{
				[ `has-margin-top-${ gutter }` ]: gutter > 0,
				[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		return (
			<div className={ paginationClasses }>
				{ images.map( ( item, index ) => (
					<GalleryCarouselThumbnail
						changeStep={ changeStep }
						index={ index }
						item={ item }
						key={ index }
						gutter={ gutter }
						gutterMobile={ gutterMobile }
					/>
				) ) }
			</div>
		);
	}, [ gutter, gutterMobile, images ] );

	const renderPageDots = useCallback( ( { changeStep } ) => {
		return (
			<div className="wp-block-coblocks-gallery-carousel-page-dot-pagination-container">
				<div className="wp-block-coblocks-gallery-carousel-page-dot-wrapper" >
					{ images.map( ( item, index ) => (
						<button className="wp-block-coblocks-gallery-carousel-page-dot-pagination" key={ index } onClick={ () => changeStep( index ) } />
					) ) }
				</div>
			</div>
		);
	}, [ selectedImage, images ] );

	const renderPagination = useCallback( ( { changeStep } ) => {
		if ( thumbnails ) {
			return renderGalleryPagination( { changeStep } );
		} else if ( pageDots ) {
			return renderPageDots( { changeStep } );
		}

		return null;
	}, [ gutter, gutterMobile, images, thumbnails ] );

	const renderSwiper = useMemo( () => {
		const swiperSizing = {
			lrg: 2,
			med: 4,
			sml: 5,
			xlrg: 1,
		};

		return (
			<Swiper
				autoPlaySpeed={ autoPlay ? autoPlaySpeed : null }
				freeScroll={ freeScroll }
				isDraggable={ draggable }
				list={ images }
				loop={ loop }
				navigation={ prevNextButtons }
				onSwipe={ handleSwipe }
				Pagination={ renderPagination }
				pauseHover={ autoPlay ? pauseHover : null }
				slidesPerView={ swiperSizing[ gridSize ] }
			>
				{ ( {
					index,
				} ) => {
					const ariaLabel = sprintf(
						/* translators: %1$d is the order number of the image, %2$d is the total number of images */
						__( 'image %1$d of %2$d in gallery', 'coblocks' ),
						( index + 1 ),
						images.length
					);

					return (
						<>
							<GalleryCarouselItem
								ariaLabel={ ariaLabel }
								handleRemoveImage={ handleRemoveImage }
								handleReplaceImage={ handleReplaceImage }
								index={ index }
								setAttributes={ setAttributes }
							/>
						</>
					);
				} }
			</Swiper>
		);
	}, [
		autoPlay,
		autoPlaySpeed,
		draggable,
		freeScroll,
		gridSize,
		gutter,
		gutterMobile,
		images,
		loop,
		pageDots,
		pauseHover,
		prevNextButtons,
		thumbnails,
	] );

	const renderGalleryPlaceholder = () => {
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
					gutter={ attributes.gutter }
					icon={ <Icon icon={ icon } /> }
					label={ __( 'Carousel', 'coblocks' ) }
					variationLabel={ variationLabel }
				/>
			</>
		);
	};

	if ( ! images.length && ! variatonSelected ) {
		return (
			<CarouselGalleryVariationPicker { ...props } />
		);
	} else if ( ! images.length && variatonSelected ) {
		return renderGalleryPlaceholder();
	}

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
				className={ classnames( {
					'has-responsive-height': responsiveHeight,
					'is-selected': isSelected,
				} ) }
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
				minHeight="0"
				onClick={ handleSelectCarousel }
				onResizeStop={ ( _event, _direction, _elt, delta ) => {
					setAttributes( {
						height: parseInt( height + delta.height, 10 ),
					} );
				} }
				showHandle={ isSelected }
				size={ {
					height,
					width: '100%',
				} }
			>
				<div className={ className }>
					<div className={ innerClasses } style={ swiperStyles }>
						{ renderSwiper }
					</div>
				</div>
			</ResizableBox>
			{ renderGalleryPlaceholder() }
		</>
	);
};

const GalleryCarouselThumbnail = ( { gutter, gutterMobile, changeStep, item, index } ) => {
	const { selectedImage } = useContext( GalleryCarouselContext );

	const thumbnailClasses = classnames( {
		'is-active': index === selectedImage,
		'wp-block-coblocks-gallery-carousel-thumbnail': true,
		[ `has-margin-top-${ gutter }` ]: gutter > 0,
		[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		[ `has-margin-right-${ gutter }` ]: gutter > 0,
		[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		[ `has-margin-bottom-${ gutter }` ]: gutter > 0,
		[ `has-margin-bottom-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		[ `has-margin-left-${ gutter }` ]: gutter > 0,
		[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
	} );

	return (
		<button className={ thumbnailClasses } onClick={ () => changeStep( index ) } style={ { height: '80px', width: '100px' } } >
			<img alt={ item.alt } data-id={ item.id } data-link={ item.link } src={ item.url } style={ { height: '100%', width: '100%' } } />
		</button>
	);
};

const withGalleryCarouselState = ( Component ) => {
	return ( props ) => {
		const { attributes, isSelected } = props;

		const defaultGalleryState = {
			gutter: attributes.gutter,
			gutterMobile: attributes.gutterMobile,
			images: attributes.images,
			isSelected,
			showThumbnails: attributes.thumbnails,
		};

		return (
			<GalleryContextProvider { ...defaultGalleryState }>
				<Component { ...props } />
			</GalleryContextProvider>
		);
	};
};

export default compose( [
	withNotices,
	withGalleryCarouselState,
] )( GalleryCarouselEdit );

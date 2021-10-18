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

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/icons';
import { RichText } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
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

	const [ selectedImage, setSelectedImage ] = useState( null );
	const [ captionFocused, setCaptionFocused ] = useState( false );

	const { selectBlock } = useDispatch( 'core/block-editor' );

	const [carouselCurrentStep, setCarouselCurrentStep] = useState( 0 );

	const prevSelected = usePrevious( props.isSelected );

	useEffect( () => {
		if ( ! props.isSelected && prevSelected ) {
			setSelectedImage( null );
			setCaptionFocused( false );
		}

		if ( ! props.isSelected && prevSelected && captionFocused ) {
			setCaptionFocused( false );
		}
	}, [ prevSelected, props.isSelected, captionFocused ] );

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

	const onSelectImage = ( index ) => {
		if ( selectedImage !== index ) {
			setSelectedImage( index );
			setCaptionFocused( false );
		}
	};

	const onRemoveImage = ( index ) => {
		const images = filter( props.attributes.images, ( _img, i ) => index !== i );
		setSelectedImage( null );
		props.setAttributes( { images } );
	};

	/**
	 * replaceImage is passed to GalleryImage component and is used to replace images
	 *
	 * @param {number} index Index of image to remove.
	 * @param {Object} media Media object used to initialize attributes.
	 */
	const replaceImage = ( index, media ) => {
		const images = [ ...props.attributes.images ];
		images[ index ] = { ...media };

		props.setAttributes( { images } );
	};

	const setImageAttributes = ( index, attributes ) => {
		const { attributes: { images }, setAttributes } = props;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	};

	const onFocusCaption = () => {
		if ( ! captionFocused ) {
			setCaptionFocused( true );
		}
	};

	const onItemClick = () => {
		if ( ! props.isSelected ) {
			selectBlock();
		}

		if ( captionFocused ) {
			setCaptionFocused( false );
		}
	};

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
	} = attributes;

	const variatonSelected = hasVariationSet( attributes );
	const hasImages = !! images.length;

	if ( ! hasImages && ! variatonSelected && variatonSelected !== 'skip' ) {
		return ( <CarouselGalleryVariationPicker { ...props } /> );
	}

	const variationLabel = ( !! variatonSelected && variatonSelected !== 'skip' )
		? sprintf(
		/* translators: %s: Type of gallery variation */
			__( '%s Carousel', 'coblocks' ),
			variatonSelected
		) : false;

	const carouselGalleryPlaceholder = (
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

	if ( ! hasImages ) {
		return carouselGalleryPlaceholder;
	}

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

	const flickityClasses = classnames(
		'has-carousel',
		`has-carousel-${ gridSize }`, {
			'has-aligned-cells': alignCells,
			[ `has-margin-bottom-${ gutter }` ]: thumbnails && gutter > 0,
			[ `has-margin-bottom-mobile-${ gutterMobile }` ]: thumbnails && gutterMobile > 0,
			[ navForClass ]: thumbnails,
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

	const flickityOptions = {
		draggable: false,
		pageDots: true,
		prevNextButtons: true,
		wrapAround: true,
		autoPlay: false,
		cellAlign: alignCells ? 'left' : 'center',
		arrowShape: {
			x0: 10,
			x1: 60, y1: 50,
			x2: 65, y2: 45,
			x3: 20,
		},
		responsiveHeight,
		thumbnails,
	};

	const navOptions = {
		asNavFor: `.${ navForClass }`,
		draggable: false,
		pageDots: true,
		prevNextButtons: false,
		wrapAround: true,
		autoPlay: false,
		thumbnails: false,
		cellAlign: 'left',
	};

	const navStyles = {
		marginTop: gutter > 0 && ! responsiveHeight ? ( gutter / 2 ) + 'px' : undefined,
		height: height / 3
	};

	const navFigureClasses = classnames(
		'coblocks--figure', {
			[ `has-margin-left-${ gutter }` ]: gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			[ `has-margin-right-${ gutter }` ]: gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	const swiperCarouselUuid = uuid();
	const swiperThumbnailUuid = uuid();

	console.log('height stuff', {
		height,
		responsiveHeight
	});

	// return (
	// 	<>
	// 		{ isSelected && (
	// 			<>
	// 				<Controls { ...props } />
	// 				<Inspector { ...props } />
	// 			</>
	// 		) }
	// 		{ noticeUI }
	// 		<ResizableBox
	// 			size={ {
	// 				height: 'auto',
	// 				minHeight: height,
	// 				width: '100%',
	// 			} }
	// 			className={ classnames( {
	// 				'is-selected': isSelected,
	// 				'has-responsive-height': responsiveHeight,
	// 			} ) }
	// 			minHeight="0"
	// 			enable={ {
	// 				bottom: true,
	// 				bottomLeft: false,
	// 				bottomRight: false,
	// 				left: false,
	// 				right: false,
	// 				top: false,
	// 				topLeft: false,
	// 				topRight: false,
	// 			} }
	// 			onResizeStop={ ( _event, _direction, _elt, delta ) => {
	// 				setAttributes( {
	// 					height: parseInt( height + delta.height, 10 ),
	// 				} );
	// 			} }
	// 			showHandle={ isSelected }
	// 		>
	// 			<div className={ className }>
	// 				<div className={ innerClasses }>
	// 					<Swiper
	// 					    stepChangeCallback={step => setCarouselCurrentStep(step)}
	// 						list={images}
	// 						uuid={swiperCarouselUuid}
	// 						navigation
	// 						PaginationControl={{
	// 							class: "wp-block-coblocks-gallery-carousel-thumbnail-pagination",
	// 							render: ({ index, className: pageClassName }) => {
	// 								const item = images[index];

	// 								// return ReactDOMServer.renderToStaticMarkup(
	// 								// 	<div className={`${pageClassName} wp-block-coblocks-gallery-carousel-thumbnail`} style={{ height: '80px', width: '100px' }} >
	// 								// 		<img src={ item.url } alt={ item.alt } data-link={ item.link } data-id={ item.id } style={{ height: '100%', width: '100%' }} />	
	// 								// 	</div>
	// 								// );

	// 								return (
	// 									<div className={`wp-block-coblocks-gallery-carousel-thumbnail`} style={{ height: '80px', width: '100px' }} >
	// 										<img src={ item.url } alt={ item.alt } data-link={ item.link } data-id={ item.id } style={{ height: '100%', width: '100%' }} />	
	// 									</div>
	// 								);
	// 							}
	// 						}}
	// 					>
	// 						{({
	// 							item,
	// 							index,
	// 						}) => {
	// 							const ariaLabel = sprintf(
	// 								__( 'image %1$d of %2$d in gallery', 'coblocks' ),
	// 								( index + 1 ),
	// 								images.length
	// 							);

	// 							return (
	// 								<div style={{ height: thumbnails ? height + 80 : height, width: '100%' }} className="coblocks-gallery--item" role="button" tabIndex="0" key={ item.id || item.url } onKeyDown={ onItemClick } onClick={ onItemClick } >
	// 										<GalleryImage
	// 											url={ item.url }
	// 											alt={ item.alt }
	// 											id={ item.id }
	// 											gutter={ gutter }
	// 											gutterMobile={ gutterMobile }
	// 											marginRight={ true }
	// 											marginLeft={ true }
	// 											isSelected={ isSelected && selectedImage === index }
	// 											onRemove={ () => onRemoveImage( index ) }
	// 											onSelect={ () => {
	// 												onSelectImage( index );
	// 											} }
	// 											setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
	// 											caption={ item.caption }
	// 											aria-label={ ariaLabel }
	// 											supportsCaption={ false }
	// 											supportsMoving={ false }
	// 											imageIndex={ index }
	// 											replaceImage={ replaceImage }
	// 										/>
	// 								</div>
	// 							);
	// 						}}
	// 					</Swiper>
	// 				</div>
	// 			</div>
	// 		</ResizableBox>
	// 		{ carouselGalleryPlaceholder }
	// 		{ ( ! RichText.isEmpty( primaryCaption ) || isSelected ) && (
	// 			<RichText
	// 				tagName="figcaption"
	// 				placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
	// 				value={ primaryCaption }
	// 				className="coblocks-gallery--caption coblocks-gallery--primary-caption"
	// 				unstableOnFocus={ onFocusCaption }
	// 				onChange={ ( value ) => setAttributes( { primaryCaption: value } ) }
	// 				isSelected={ captionFocused }
	// 				keepPlaceholderOnFocus
	// 				inlineToolbar
	// 			/>
	// 		) }
	// 	</>
	// );

	// return (
	// 	<>
	// 		{ isSelected && (
	// 			<>
	// 				<Controls { ...props } />
	// 				<Inspector { ...props } />
	// 			</>
	// 		) }
	// 		{ noticeUI }
	// 		<ResizableBox
	// 			size={ {
	// 				height,
	// 				width: '100%',
	// 			} }
	// 			className={ classnames( {
	// 				'is-selected': isSelected,
	// 				'has-responsive-height': responsiveHeight,
	// 			} ) }
	// 			minHeight="0"
	// 			enable={ {
	// 				bottom: true,
	// 				bottomLeft: false,
	// 				bottomRight: false,
	// 				left: false,
	// 				right: false,
	// 				top: false,
	// 				topLeft: false,
	// 				topRight: false,
	// 			} }
	// 			onResizeStop={ ( _event, _direction, _elt, delta ) => {
	// 				setAttributes( {
	// 					height: parseInt( height + delta.height, 10 ),
	// 				} );
	// 			} }
	// 			showHandle={ isSelected }
	// 		>
	// 			<div className={ className }>
	// 				<div className={ innerClasses }>
	// 					<Flickity
	// 						className={ flickityClasses }
	// 						disableImagesLoaded={ true }
	// 						options={ flickityOptions }
	// 						reloadOnUpdate={ true }
	// 						updateOnEachImageLoad={ true }
	// 					>
	// 						{ images.map( ( img, index ) => {
	// 							const ariaLabel = sprintf(
	// 								/* translators: %1$d is the order number of the image, %2$d is the total number of images */
	// 								__( 'image %1$d of %2$d in gallery', 'coblocks' ),
	// 								( index + 1 ),
	// 								images.length
	// 							);

	// 							return (
	// 								<div className="coblocks-gallery--item" role="button" tabIndex="0" key={ img.id || img.url } onKeyDown={ onItemClick } onClick={ onItemClick }>
	// 									<GalleryImage
	// 										url={ img.url }
	// 										alt={ img.alt }
	// 										id={ img.id }
	// 										gutter={ gutter }
	// 										gutterMobile={ gutterMobile }
	// 										marginRight={ true }
	// 										marginLeft={ true }
	// 										isSelected={ isSelected && selectedImage === index }
	// 										onRemove={ () => onRemoveImage( index ) }
	// 										onSelect={ () => onSelectImage( index ) }
	// 										setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
	// 										caption={ img.caption }
	// 										aria-label={ ariaLabel }
	// 										supportsCaption={ false }
	// 										supportsMoving={ false }
	// 										imageIndex={ index }
	// 										replaceImage={ replaceImage }
	// 									/>
	// 								</div>
	// 							);
	// 						} ) }
	// 					</Flickity>
	// 				</div>
	// 			</div>
	// 		</ResizableBox>
	// 		{ thumbnails &&
	// 		<div className={ className }>
	// 			<div
	// 				className={ innerClasses }
	// 				style={ navStyles }
	// 			>
	// 				<Flickity
	// 					className={ navClasses }
	// 					options={ navOptions }
	// 					disableImagesLoaded={ true }
	// 					reloadOnUpdate={ true }
	// 					updateOnEachImageLoad={ true }
	// 				>
	// 					{ images.map( ( image ) => {
	// 						return (
	// 							<div className="coblocks--item-thumbnail" key={ image.id || image.url }>
	// 								<figure className={ navFigureClasses }>
	// 									<img src={ image.url } alt={ image.alt } data-link={ image.link } data-id={ image.id } className={ image.id ? `wp-image-${ image.id }` : null } />
	// 								</figure>
	// 							</div>
	// 						);
	// 					} ) }
	// 				</Flickity>
	// 			</div>
	// 		</div>
	// 		}
	// 		{ carouselGalleryPlaceholder }
	// 		{ ( ! RichText.isEmpty( primaryCaption ) || isSelected ) && (
	// 			<RichText
	// 				tagName="figcaption"
	// 				placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
	// 				value={ primaryCaption }
	// 				className="coblocks-gallery--caption coblocks-gallery--primary-caption"
	// 				unstableOnFocus={ onFocusCaption }
	// 				onChange={ ( value ) => setAttributes( { primaryCaption: value } ) }
	// 				isSelected={ captionFocused }
	// 				keepPlaceholderOnFocus
	// 				inlineToolbar
	// 			/>
	// 		) }
	// 	</>
	// );

	console.log('isSelected', isSelected);

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
				<div className={ className } onClick={() => selectBlock(props.clientId)}>
					<div className={ innerClasses }>
						<Swiper
							list={images}
							uuid={swiperCarouselUuid}
							navigation
							{...(thumbnails ? {
								PaginationControl: {
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
									<div className="coblocks-gallery--item" role="button" tabIndex="0" key={ item.id || item.url } onKeyDown={ onItemClick } onClick={ onItemClick }>
										<GalleryImage
											url={ item.url }
											alt={ item.alt }
											id={ item.id }
											gutter={ gutter }
											gutterMobile={ gutterMobile }
											marginRight={ true }
											marginLeft={ true }
											isSelected={ isSelected && selectedImage === index }
											onRemove={ () => onRemoveImage( index ) }
											onSelect={ () => onSelectImage( index ) }
											setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
											caption={ item.caption }
											aria-label={ ariaLabel }
											supportsCaption={ false }
											supportsMoving={ false }
											imageIndex={ index }
											replaceImage={ replaceImage }
										/>
									</div>
								);									
							}}
						</Swiper>
					</div>
				</div>
			</ResizableBox>
			{ ( ! RichText.isEmpty( primaryCaption ) || isSelected ) && (
				<RichText
					tagName="figcaption"
					placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
					value={ primaryCaption }
					className="coblocks-gallery--caption coblocks-gallery--primary-caption"
					unstableOnFocus={ onFocusCaption }
					onChange={ ( value ) => setAttributes( { primaryCaption: value } ) }
					isSelected={ captionFocused }
					keepPlaceholderOnFocus
					inlineToolbar
				/>
			) }
		</>
	);
};

export default compose( [
	withNotices,
] )( GalleryCarouselEdit );

/**
 * External dependencies
 */
import classnames from 'classnames';
import { GalleryCarouselIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { compose } from '@wordpress/compose';
import { withNotices, ResizableBox } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';

//TODO: Deprecation, Save, autoplay, transforms, lightbox, tests.
// Figure out why the image attributes work on initial save but not on refresh.
// Masonry block is incompatible with the AMP script!
// Need to handle `is_amp()` logic.

const GalleryCarouselEdit = ( props ) => {
	const { attributes, setAttributes, isSelected, clientId, noticeUI, className } = props;
	const {
		align,
		gutter,
		gutterMobile,
		height,
		images,
		prevNextButtons,
		primaryCaption,
		thumbnails,
		responsiveHeight,
		lightbox,
		autoPlay,
		autoPlaySpeed,
		carouselId,
	} = attributes;

	const hasImages = !! images.length;

	const carouselGalleryPlaceholder = (
		<>
			{ ! hasImages ? noticeUI : null }
			<GalleryPlaceholder
				{ ...props }
				label={ __( 'Carousel', 'coblocks' ) }
				icon={ <Icon icon={ icon } /> }
				gutter={ gutter }
			/>
		</> );

	useEffect( ( ) => {
		const carousel = document.getElementById( carouselId );
		if ( !! carousel ) {
			const newHeightValue = `${ height }px`;
			const slides = carousel.querySelectorAll( '.amp-carousel-slide > amp-img' );
			carousel.style.height = newHeightValue;
			slides.forEach( ( slide ) => slide.style.height = newHeightValue );
		}
	}, [ height ] );

	// useEffect( ( ) => {
	// 	const carousel = document.getElementById( clientId );
	// 	if ( !! carousel ) {
	// 		const newHeightValue = `${ height }px`;
	// 		const slides = carousel.querySelectorAll( '.amp-carousel-slide' );
	// 		document.getElementById( clientId ).style.height = newHeightValue;
	// 		slides.forEach( ( slide ) => slide.style.height = newHeightValue );
	// 	}
	// }, [ autoPlay ] );

	useEffect( ( ) => { // Remove lightbox functionality from editor.
		const carousel = document.getElementById( carouselId );
		if ( !! carousel ) {
			carousel.removeAttribute( 'lightbox' );
		}
	}, [ lightbox ] );

	useEffect( ( ) => { // Initialize the carouselId attribute on mount.
		setAttributes( { carouselId: clientId.replace( /-/g, '' ) } );
	}, [ carouselId ] );

	if ( ! hasImages ) {
		return carouselGalleryPlaceholder;
	}

	const innerClasses = classnames(
		'is-cropped',
		...GalleryClasses( attributes ), {
			[ `align${ align }` ]: align,
			'has-horizontal-gutter': gutter > 0,
			'is-selected': isSelected,
			'has-lightbox': lightbox,
			'has-no-arrows': ! prevNextButtons,
		}
	);

	const classes = classnames(
		className, {
			'has-responsive-height': responsiveHeight,
		}
	);

	const navFigureClasses = classnames( 'carousel-nav', {
		[ `has-margin-left-${ gutter }` ]: gutter > 0,
		[ `has-margin-left-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		[ `has-margin-right-${ gutter }` ]: gutter > 0,
		[ `has-margin-right-mobile-${ gutterMobile }` ]: gutterMobile > 0,
	}
	);

	const renderAmpCarousel = () => {
		return (
			<amp-carousel
				lightbox={ lightbox ? carouselId : undefined }
				id={ carouselId }
				height={ responsiveHeight ? null : height }
				layout={ responsiveHeight ? 'fill' : 'fixed-height' }
				type="slides"
				role="region"
				aria-label={ __( 'Carousel', 'coblocks' ) }
				class={ className }
				autoplay={ autoPlay }
				delay={ autoPlaySpeed }
				loop
			>
				{ images.map( ( img, index ) => {
					const ariaLabel = sprintf(
						/* translators: %1$d is the order number of the image, %2$d is the total number of images */
						__( 'image %1$d of %2$d in gallery', 'coblocks' ),
						( index + 1 ),
						images.length
					);

					return (
						<div className="coblocks-gallery--item" role="button" tabIndex="0" key={ img.id || img.url }>
							<amp-img
								src={ img.url }
								height={ responsiveHeight ? null : height }
								alt={ img.alt }
								id={ img.id }
								key={ img.id || img.url }
								aria-label={ ariaLabel }
							></amp-img>
						</div>
					);
				} ) }
			</amp-carousel>

		);
	};

	const renderAmpCarouselThumnails = () => {
		return (
			<div className="coblocks-carousel-preview">
				{ images.map( ( image, index ) => {
					return (
						<div key={ image.id || image.url } className="coblocks--item-thumbnail">
							<figure className={ navFigureClasses } >
								<amp-img
									layout="flex-item"
									height="80"
									on={ `tap:${ carouselId }.goToSlide(index=${ index })` }
									src={ image.url }
									alt={ image.alt }
									data-link={ image.link }
									key={ image.id || image.url }
									data-id={ image.id }
									class={ classnames( { [ `wp-image-${ image.id }` ]: image.id } ) }
								></amp-img>
							</figure>
						</div>
					);
				} ) }
			</div>

		);
	};

	return (
		<>
			{ isSelected &&	<Controls { ...props } /> }
			{ isSelected &&	<Inspector { ...props } /> }
			{ noticeUI }
			<div className={ classes }>
				<div className={ innerClasses }>
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
						{ renderAmpCarousel() }

					</ResizableBox>
				</div>
				{ ( ! RichText.isEmpty( primaryCaption ) || isSelected ) && (
					<RichText
						tagName="figcaption"
						placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
						value={ primaryCaption }
						className="coblocks-gallery--caption coblocks-gallery--primary-caption"
						onChange={ ( value ) => setAttributes( { primaryCaption: value } ) }
						keepPlaceholderOnFocus
						inlineToolbar
					/>
				) }
				{ !! thumbnails && renderAmpCarouselThumnails() }
			</div>
		</>
	);
};

export default compose( [
	withNotices,
] )( GalleryCarouselEdit );

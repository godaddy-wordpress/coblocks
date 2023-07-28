import { RichText } from '@wordpress/block-editor';
import { useContext, useMemo, useState } from '@wordpress/element';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import GalleryImage from '../../components/block-gallery/gallery-image';

import { GalleryCarouselContext } from './context';

const GalleryCarouselItem = ( {
	ariaLabel,
	index,
	handleRemoveImage,
	handleReplaceImage,
	setAttributes,
} ) => {
	const {
		setSelectedImage,
		selectedImage,
		images,
		gutter,
		gutterMobile,
	} = useContext( GalleryCarouselContext );

	const [ captionFocused, setCaptionFocused ] = useState( false );

	const item = images[ index ];
	const isItemSelected = selectedImage === index;

	const handleCaptionChange = ( val ) => {
		setAttributes( {
			images: images.map( ( image, imageIndex ) => {
				if ( imageIndex === selectedImage ) {
					return {
						...image,
						caption: val,
					};
				}
				return image;
			} ),
		} );
	};

	const renderCaption = useMemo( () => {
		return (
			<RichText
				className="coblocks-gallery--caption coblocks-gallery--primary-caption"
				inlineToolbar
				isSelected={ captionFocused }
				onChange={ ( val ) => handleCaptionChange( val ) }
				placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
				tagName="figcaption"
				unstableOnFocus={ () => {
					setCaptionFocused( ! captionFocused );
				} }
				value={ images[ selectedImage ]?.caption }
			/>
		);
	}, [ selectedImage, captionFocused ] );

	const handleImageClick = () => {
		if ( captionFocused === true ) {
			setCaptionFocused( false );
		}
	};

	const renderGalleryItem = useMemo( () => {
		return (
			<span onClick={ handleImageClick } onKeyDown={ handleImageClick } role="button" tabIndex={ 0 } >
				<GalleryImage
					alt={ item.alt }
					aria-label={ ariaLabel }
					gutter={ gutter }
					gutterMobile={ gutterMobile }
					id={ item.id }
					imageIndex={ index }
					isSelected={ isItemSelected }
					marginLeft={ true }
					marginRight={ true }
					onRemove={ () => {
						handleRemoveImage( index );
					} }
					onSelect={ () => {
						setSelectedImage( index );
					} }
					replaceImage={ handleReplaceImage }
					supportsCaption={ false }
					supportsMoving={ false }
					url={ item.url }
				/>
			</span>
		);
	}, [ isItemSelected, gutter, gutterMobile, captionFocused, item ] );

	if ( ! item ) {
		return null;
	}

	const galleryItemClasses = classnames(
		'coblocks-gallery--item',
		{
			[ `has-margin-top-${ gutter }` ]: gutter > 0,
			[ `has-margin-top-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	return (
		<div
			aria-label={ __( 'Gallery Image', 'coblocks' ) }
			className={ galleryItemClasses }
			role="button"
			style={ {
				position: 'relative',
			} }
			tabIndex={ index }
		>
			{ renderGalleryItem }
			{ isItemSelected ? renderCaption : null }
		</div>
	);
};

export default GalleryCarouselItem;

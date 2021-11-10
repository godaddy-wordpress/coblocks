import { useContext, useMemo, useState } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

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
		isSelected,
		images,
	} = useContext( GalleryCarouselContext );

	const [ captionFocused, setCaptionFocused ] = useState( false );

	const item = images[ index ];

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
			<span tabIndex={ 0 } role="button" onClick={ handleImageClick } onKeyDown={ handleImageClick } >
				<GalleryImage
					url={ item.url }
					alt={ item.alt }
					id={ item.id }
					marginRight={ true }
					marginLeft={ true }
					onSelect={ () => {
						setSelectedImage( index );
					} }
					onRemove={ () => {
						handleRemoveImage( index );
					} }
					replaceImage={ handleReplaceImage }
					isSelected={ isSelected }
					aria-label={ ariaLabel }
					supportsCaption={ false }
					supportsMoving={ false }
					imageIndex={ index }
				/>
			</span>
		);
	}, [ captionFocused, isSelected, item ] );

	if ( ! item ) {
		return null;
	}

	return (
		<div
			className="coblocks-gallery--item"
			role="button"
			tabIndex={ index }
		>
			{ renderGalleryItem }
			{ renderCaption }
		</div>
	);
};

export default GalleryCarouselItem;

import { useContext, useMemo } from '@wordpress/element';
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
				tagName="figcaption"
				placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
				value={ images[ selectedImage ]?.caption }
				className="coblocks-gallery--caption coblocks-gallery--primary-caption"
				onChange={ ( val ) => handleCaptionChange( val ) }
				isSelected={ isSelected }
				keepPlaceholderOnFocus
				inlineToolbar
			/>
		);
	}, [ selectedImage, isSelected ] );

	const renderGalleryItem = useMemo( () => {
		return (
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
		);
	}, [ isSelected, item ] );

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

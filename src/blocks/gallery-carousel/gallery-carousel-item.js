import { useContext, useMemo, useEffect, useState, useRef } from '@wordpress/element';

import { __, sprintf } from '@wordpress/i18n';

import { RichText } from '@wordpress/block-editor';

import GalleryImage from '../../components/block-gallery/gallery-image';
import { withSelect } from '@wordpress/data';

import { GalleryCarouselContext } from './context';


const GalleryCarouselItem = ({ 
    isSelected, 
    ariaLabel, 
    item, 
    index,
    setAttributes,
    images,
}) => {
    const {
        selectedImage,
        captionFocused,
        setSelectedImage,
        setCaptionFocused,
    } = useContext(GalleryCarouselContext);

    const onFocusCaption = () => {
		if ( ! captionFocused ) {
			setCaptionFocused( true );
		}
	};

    const handleCaptionChange = ( value ) => {
        console.log('value', value);
        const newImages = images.map( ( image, imageIndex ) => {
            if ( index === imageIndex ) {
                return {
                    ...image,
                    caption: value,
                }
            }
            return image;
        });
        setAttributes({
            images: newImages
        });
    };
    
    return (
        <>
            <div 
                className="coblocks-gallery--item" 
                role="button" 
                tabIndex="0" 
                key={ item.id || item.url } 	
            >
                <GalleryImage
                    isSelected={false}
                    url={ item.url }
                    alt={ item.alt }
                    id={ item.id }
                    marginRight={ true }
                    marginLeft={ true }
                    onSelect={() => {
                        setSelectedImage( index );
                    }}
                    isSelected={ isSelected && selectedImage === index }
                    caption={ item.caption }
                    aria-label={ ariaLabel }
                    supportsCaption={ false }
                    supportsMoving={ false }
                    imageIndex={ index }      								
                />	
            </div>
            { ! RichText.isEmpty( item.caption ) || (isSelected && selectedImage === index) && (
                <RichText
                    tagName="figcaption"
                    placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
                    value={ item.caption }
                    className="coblocks-gallery--caption coblocks-gallery--primary-caption"
                    onChange={ handleCaptionChange }
                    isSelected={ captionFocused }
                    unstableOnFocus={ onFocusCaption }
                    keepPlaceholderOnFocus
                    inlineToolbar
                />
            ) }	
        </>					
    );

    // <RichText
    //                 tagName="figcaption"
    //                 placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
    //                 value={ '' }
    //                 className="coblocks-gallery--caption coblocks-gallery--primary-caption"
    //                 unstableOnFocus={ onFocusCaption }
    //                 onChange={ ( value ) => setAttributes( { primaryCaption: value } ) }
    //                 isSelected={ captionFocused }
    //                 keepPlaceholderOnFocus
    //                 inlineToolbar
    //             />
        
    // return (
    //     <div 
    //         className="coblocks-gallery--item" 
    //         role="button" 
    //         tabIndex="0" 
    //         key={ item.id || item.url } 		
    //     >
    //         <GalleryImage
    //             url={ item.url }
    //             alt={ item.alt }
    //             id={ item.id }
    //             gutter={ gutter }
    //             gutterMobile={ gutterMobile }
    //             marginRight={ true }
    //             marginLeft={ true }
    //             isSelected={ isSelected && selectedImage === index }
    //             onRemove={ () => onRemoveImage( index ) }
    //             onSelect={() => null}
    //             setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
    //             caption={ item.caption }
    //             aria-label={ ariaLabel }
    //             supportsCaption={ false }
    //             supportsMoving={ false }
    //             imageIndex={ index }
    //             replaceImage={ replaceImage }									
    //         />		
    //     </div>		
    // );	
}

export default GalleryCarouselItem;
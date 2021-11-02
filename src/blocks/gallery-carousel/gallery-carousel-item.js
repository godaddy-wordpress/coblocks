import { useContext, useMemo } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import GalleryImage from '../../components/block-gallery/gallery-image';

import { GalleryCarouselContext } from './context';

const GalleryCarouselItem = ({ 
    ariaLabel, 
    index,
    handleRemoveImage,
    handleReplaceImage,
}) => {
    const {
        setSelectedImage,
        isSelected,
        images,
    } = useContext(GalleryCarouselContext);

    const item = images[index];

    if ( !item ) {
        return null;
    }

    const renderGalleryItem = useMemo(() => {
         return (
            <div 
                className="coblocks-gallery--item" 
                role="button" 
                tabIndex={index}
            >
                <GalleryImage
                    url={ item.url }
                    alt={ item.alt }
                    id={ item.id }
                    marginRight={ true }
                    marginLeft={ true }
                    onSelect={() => {
                        setSelectedImage( index );
                    }}
                    onRemove={() => {
                        handleRemoveImage(index);
                    }}
                    replaceImage={ handleReplaceImage }
                    isSelected={ isSelected }
                    aria-label={ ariaLabel }
                    supportsCaption={ false }
                    supportsMoving={ false }
                    imageIndex={ index }      								
                />	
            </div>				
        );  
    }, [ isSelected, item ]);

    return renderGalleryItem;
}

export default GalleryCarouselItem;
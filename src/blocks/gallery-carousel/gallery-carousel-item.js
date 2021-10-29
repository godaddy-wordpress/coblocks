import { useContext, useMemo, useEffect } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import GalleryImage from '../../components/block-gallery/gallery-image';

import { GalleryCarouselContext } from './context';


const GalleryCarouselItem = ({ 
    ariaLabel, 
    index,
}) => {
    const {
        setSelectedImage,
        selectedImage,
        isSelected,
        images,
    } = useContext(GalleryCarouselContext);

    const isItemSelected = isSelected && selectedImage === index;
    const item = images[index];

    const renderGalleryItem = useMemo(() => {
        return (
            <div 
                className="coblocks-gallery--item" 
                role="button" 
                tabIndex={index}
                style={{ pointerEvents: 'none', touchAction: 'none' }}
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
                    isSelected={ isSelected }
                    aria-label={ ariaLabel }
                    supportsCaption={ false }
                    supportsMoving={ false }
                    imageIndex={ index }      								
                />	
            </div>				
        );  
    }, [ isItemSelected ]);

    return renderGalleryItem;
}

export default GalleryCarouselItem;
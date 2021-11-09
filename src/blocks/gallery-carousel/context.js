import { createContext, useState  } from '@wordpress/element';

const GalleryCarouselContext = createContext({
    setSelectedImage: index => {},
    setCaptionFocused: index => {},
	selectedImage: null,
	captionFocused: false,
    images: [],
    isSelected: false,
    showThumbnails: false,
});

const GalleryContextProvider = ({  showThumbnails, children, images, isSelected, }) => {
    const [ selectedImage, setSelectedImage ] = useState( null );
    const [ captionFocused, setCaptionFocused ] = useState( false );

    const galleryContext = {
        selectedImage,
        setSelectedImage,
        captionFocused,
        setCaptionFocused,
        images,
        isSelected,
        showThumbnails
    }

    return (
        <GalleryCarouselContext.Provider value={galleryContext} >
            {children}
        </GalleryCarouselContext.Provider>
    );
}

export {
    GalleryCarouselContext,
    GalleryContextProvider
}; 
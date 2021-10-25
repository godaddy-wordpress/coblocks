import { createContext, useState  } from '@wordpress/element';

const GalleryCarouselContext = createContext({
    setSelectedImage: index => {},
    setCaptionFocused: focused => {},
	selectedImage: null,
	captionFocused: false,
});

const GalleryContextProvider = ({  children }) => {
    const [ selectedImage, setSelectedImage ] = useState( null );
    const [ captionFocused, setCaptionFocused ] = useState( false );

    const galleryContextState = {
        selectedImage,
        setSelectedImage,
        captionFocused,
        setCaptionFocused,
    };

    return (
        <GalleryCarouselContext.Provider value={galleryContextState} >
            {children}
        </GalleryCarouselContext.Provider>
    );
}

export {
    GalleryCarouselContext,
    GalleryContextProvider
};
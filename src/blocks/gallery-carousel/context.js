import { createContext, useState } from '@wordpress/element';

const GalleryCarouselContext = createContext( {
	setSelectedImage: () => {},
	setCaptionFocused: () => {},
	selectedImage: null,
	captionFocused: false,
	images: [],
	isSelected: false,
	showThumbnails: false,
	gutter: 0,
	gutterMobile: 0,
} );

const GalleryContextProvider = ( { gutter, gutterMobile, showThumbnails, children, images, isSelected } ) => {
	const [ selectedImage, setSelectedImage ] = useState( null );
	const [ captionFocused, setCaptionFocused ] = useState( false );

	const galleryContext = {
		selectedImage,
		setSelectedImage,
		captionFocused,
		setCaptionFocused,
		images,
		isSelected,
		showThumbnails,
		gutter,
		gutterMobile,
	};

	return (
		<GalleryCarouselContext.Provider value={ galleryContext } >
			{ children }
		</GalleryCarouselContext.Provider>
	);
};

export {
	GalleryCarouselContext,
	GalleryContextProvider,
};

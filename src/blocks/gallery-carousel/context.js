import { createContext, useState } from '@wordpress/element';

const GalleryCarouselContext = createContext( {
	captionFocused: false,
	gutter: 0,
	gutterMobile: 0,
	images: [],
	isSelected: false,
	selectedImage: null,
	setCaptionFocused: () => {},
	setSelectedImage: () => {},
	showThumbnails: false,
} );

const GalleryContextProvider = ( { gutter, gutterMobile, showThumbnails, children, images, isSelected } ) => {
	const [ selectedImage, setSelectedImage ] = useState( null );
	const [ captionFocused, setCaptionFocused ] = useState( false );

	const galleryContext = {
		captionFocused,
		gutter,
		gutterMobile,
		images,
		isSelected,
		selectedImage,
		setCaptionFocused,
		setSelectedImage,
		showThumbnails,
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

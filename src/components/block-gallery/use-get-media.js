/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Retrieves the extended media info for each gallery image from the store. This is used to
 * determine which image size options are available for the current gallery.
 *
 * @param {Array} innerBlockImages An array of the innerBlock images currently in the gallery.
 * @return {Array} An array of media info options for each gallery image.
 */
export default function useGetMedia( innerBlockImages ) {
	const [ currentImageMedia, setCurrentImageMedia ] = useState( [] );

	const imageMedia = useSelect(
		( select ) => {
			if ( ! innerBlockImages?.length ) {
				return [];
			}

			const imageIds = innerBlockImages
				.map( ( imageBlock ) => imageBlock.attributes.id )
				.filter( ( id ) => id !== undefined );

			if ( imageIds.length === 0 ) {
				return [];
			}

			if ( imageIds.length > 100 ) {
				// If there are more than 100 images in the Masonry gallery we must run getMediaItems
				// once per 100 in order to get all of the image attributes correctly.
				const imageIdsClone = [ ...imageIds ];
				let imageMediaCompilation = [];
				while ( imageIdsClone.length ) {
					const mediaData = select( coreStore ).getMediaItems( {
						include: imageIdsClone.splice( 0, 100 ).join( ',' ),
						per_page: 100,
					} ) ?? [];

					imageMediaCompilation = [ ...imageMediaCompilation, ...mediaData ];
				}
				return imageMediaCompilation;
			}

			const mediaData = select( coreStore ).getMediaItems( {
				include: imageIds.join( ',' ),
				per_page: 100,
			} );

			return mediaData || [];
		},
		[ innerBlockImages ]
	);

	if (
		imageMedia?.length !== currentImageMedia?.length ||
        imageMedia?.some( ( newImage ) => ! currentImageMedia.find(	( currentImage ) => currentImage.id === newImage.id	) )
	) {
		setCurrentImageMedia( imageMedia );
		return imageMedia;
	}
	return currentImageMedia;
}

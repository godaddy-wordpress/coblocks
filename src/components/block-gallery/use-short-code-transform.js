/**
 * External dependencies
 */
import { every } from 'lodash';

/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Shortcode transforms don't currently have a tranform method and so can't use a selector to
 * retrieve the data for each image being transformer, so this selector handle this post transformation.
 *
 * @param {Array} shortCodeTransforms An array of image data passed from the shortcode transform.
 * @return {Array} An array of extended image data objects for each of the shortcode transform images.
 */
export default function useShortCodeTransform( shortCodeTransforms ) {
	const newImageData = useSelect(
		( select ) => {
			if ( ! shortCodeTransforms || shortCodeTransforms.length === 0 ) {
				return;
			}
			const getMedia = select( coreStore ).getMedia;
			return shortCodeTransforms.map( ( image ) => {
				const imageData = getMedia( image.id );
				if ( imageData ) {
					return {
						alt: imageData.alt_text,
						id: imageData.id,
						link: imageData.link,
						mime: imageData.mime_type,
						type: 'image',
						url: imageData.source_url,
					};
				}
				return undefined;
			} );
		},
		[ shortCodeTransforms ]
	);

	if ( ! newImageData ) {
		return;
	}

	if ( every( newImageData, ( img ) => img && img.url ) ) {
		return newImageData;
	}
}

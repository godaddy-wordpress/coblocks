/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [],
	to: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			isMatch: ( { mediaType, mediaUrl } ) => {
				return ! mediaUrl || mediaType === 'image';
			},
			transform: ( { mediaAlt, mediaId, mediaUrl } ) => {
				return createBlock( 'core/image', {
					alt: mediaAlt,
					id: mediaId,
					url: mediaUrl,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/video' ],
			isMatch: ( { mediaType, mediaUrl } ) => {
				return ! mediaUrl || mediaType === 'video';
			},
			transform: ( { mediaId, mediaUrl } ) => {
				return createBlock( 'core/video', {
					id: mediaId,
					src: mediaUrl,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/media-text' ],
			transform: ( { mediaAlt, mediaUrl, mediaId, mediaType, mediaPosition } ) => (
				createBlock( 'core/media-text', {
					mediaAlt,
					mediaId,
					mediaUrl,
					mediaType,
					mediaPosition,
				} )
			),
		},
	],
};

export default transforms;

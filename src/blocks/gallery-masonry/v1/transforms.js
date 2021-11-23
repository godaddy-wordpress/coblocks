/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import { GalleryTransforms } from '../../../components/block-gallery/shared';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			blocks: [
				'coblocks/gallery-carousel',
				'coblocks/gallery-collage',
				'coblocks/gallery-stacked',
				'coblocks/gallery-offset',
				'core/gallery',
			],
			transform: ( attributes ) => createBlock( metadata.name, GalleryTransforms( attributes ) ),
			type: 'block',
		},
		{
			blocks: [ 'core/image' ],
			isMultiBlock: true,
			transform: ( attributes ) => {
				const validImages = filter( attributes, ( { id, url } ) => Number.isInteger( id ) && url );
				const hasCaption = !! filter( attributes, ( { caption } ) => !! caption );

				if ( validImages.length > 0 ) {
					return createBlock( metadata.name, {
						captions: hasCaption,
						ids: validImages.map( ( { id } ) => id ),
						images: validImages.map( ( { id, url, alt, caption }, index ) => ( { alt: alt || '', caption: caption || '', id, index, url } ) ),
					} );
				}
				return createBlock( metadata.name );
			},
			type: 'block',

		},
		{
			prefix: ':masonry',
			transform( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
			type: 'prefix',
		},
	],
	to: [
		{
			blocks: [ 'core/gallery' ],
			transform: ( attributes ) => createBlock( 'core/gallery', {
				...GalleryTransforms( attributes ),
			} ),
			type: 'block',
		},
	],
};

export default transforms;

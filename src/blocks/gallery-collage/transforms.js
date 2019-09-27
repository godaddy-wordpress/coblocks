/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { GalleryTransforms } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [
				'coblocks/gallery-carousel',
				'coblocks/gallery-masonry',
				'coblocks/gallery-stacked',
				'blockgallery/carousel',
				'blockgallery/masonry',
				'blockgallery/stacked',
				'core/gallery',
			],
			transform: ( attributes ) => createBlock( metadata.name, GalleryTransforms( attributes ) ),
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/image' ],
			transform: ( attributes ) => {
				const validImages = filter( attributes, ( { id, url } ) => id && url );
				if ( validImages.length > 0 ) {
					return createBlock( metadata.name, {
						images: validImages.map( ( { id, url, alt, caption }, index ) => ( { id, url, alt, caption, index } ) ),
						ids: validImages.map( ( { id } ) => id ),
					} );
				}
				return createBlock( metadata.name );
			},
		},
		{
			type: 'prefix',
			prefix: ':masonry',
			transform: ( content ) => createBlock( metadata.name, { content } ),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform: ( attributes ) => createBlock( 'core/gallery', GalleryTransforms( attributes ) ),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-carousel' ],
			transform: ( attributes ) => createBlock( 'coblocks/gallery-carousel', GalleryTransforms( attributes ) ),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-masonry' ],
			transform: ( attributes ) => createBlock( 'coblocks/gallery-masonry', GalleryTransforms( attributes ) ),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-stacked' ],
			transform: ( attributes ) => createBlock( 'coblocks/gallery-stacked', GalleryTransforms( attributes ) ),
		},
	],
};

export default transforms;

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
import { createBlock } from '@wordpress/blocks';

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
			transform: ( attributes ) => {
				const newAttributes = Object.assign(
					GalleryTransforms( attributes ),
					{ images: attributes.images.filter( image => typeof image.id !== 'undefined' ) }
				);
				return createBlock( 'core/gallery', newAttributes );
			},
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-carousel' ],
			transform: ( attributes ) => {
				const newAttributes = Object.assign(
					GalleryTransforms( attributes ),
					{ images: attributes.images.filter( image => typeof image.id !== 'undefined' ) }
				);
				return createBlock( 'coblocks/gallery-carousel', newAttributes );
			},
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-masonry' ],
			transform: ( attributes ) => {
				const newAttributes = Object.assign(
					GalleryTransforms( attributes ),
					{ images: attributes.images.filter( image => typeof image.id !== 'undefined' ) }
				);
				return createBlock( 'coblocks/gallery-masonry', newAttributes );
			},
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-stacked' ],
			transform: ( attributes ) => {
				const newAttributes = Object.assign(
					GalleryTransforms( attributes ),
					{ images: attributes.images.filter( image => typeof image.id !== 'undefined' ) }
				);
				return createBlock( 'coblocks/gallery-stacked', newAttributes );
			},
		},
	],
};

export default transforms;

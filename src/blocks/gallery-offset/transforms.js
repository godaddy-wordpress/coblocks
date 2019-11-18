/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

/**
 * Internal dependencies
 */
import { GalleryTransforms } from '../../components/block-gallery/shared/transforms';
import { name } from './block.json';

export const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'blockgallery/masonry' ],
			transform: ( attributes ) => (
				createBlock( `${ name }`, {
					...GalleryTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'blockgallery/carousel' ],
			transform: ( attributes ) => (
				createBlock( `${ name }`, {
					...GalleryTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'blockgallery/thumbnails' ],
			transform: ( attributes ) => (
				createBlock( `${ name }`, {
					...GalleryTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'blockgallery/stacked' ],
			transform: ( attributes ) => (
				createBlock( `${ name }`, {
					...GalleryTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'blockgallery/auto-height' ],
			transform: ( attributes ) => (
				createBlock( `${ name }`, {
					...GalleryTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform: ( attributes ) => (
				createBlock( `${ name }`, {
					...GalleryTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/image' ],
			transform: ( attributes ) => {
				const validImages = filter( attributes, ( { id, url } ) => id && url );
				if ( validImages.length > 0 ) {
					return createBlock( `${ name }`, {
						images: validImages.map( ( { id, url, alt, caption } ) => ( { id, url, alt, caption } ) ),
						ids: validImages.map( ( { id } ) => id ),
					} );
				}
				return createBlock( `${ name }` );
			},
		},
		{
			type: 'prefix',
			prefix: ':offset',
			transform: function( content ) {
				return createBlock( `${ name }`, {
					content,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform: ( attributes ) => (
				createBlock( 'core/gallery', {
					...GalleryTransforms( attributes ),
				} )
			),
		},
	],
};

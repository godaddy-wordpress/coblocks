/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import { name } from './'
import { GalleryTransforms } from '../../components/block-gallery/shared';
import { BackgroundTransforms } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-masonry' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-carousel' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-thumbnails' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-offset' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/gallery-auto-height' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'blockgallery/stacked' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'blockgallery/masonry' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'blockgallery/carousel' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
					...GalleryTransforms( attributes ),
					...BackgroundTransforms( attributes ),
				} )
			),
		},
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform: ( attributes ) => (
				createBlock( `coblocks/${ name }`, {
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
					return createBlock( `coblocks/${ name }`, {
						images: validImages.map( ( { id, url, alt, caption } ) => ( { id, url, alt, caption } ) ),
						ids: validImages.map( ( { id } ) => id ),
					} );
				}
				return createBlock( `coblocks/${ name }` );
			},
		},
		{
			type: 'prefix',
			prefix: ':stacked',
			transform: function( content ) {
				return createBlock( `coblocks/${ name }`, {
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

export default transforms;
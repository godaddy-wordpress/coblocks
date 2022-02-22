/**
 * External dependencies
 */
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import { GalleryTransforms } from '../../components/block-gallery/shared';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			blocks: [
				'coblocks/gallery-collage',
				'coblocks/gallery-offset',
				'coblocks/gallery-carousel',
				'core/gallery',
			],
			transform: ( attributes ) => {
				const { gutter, gutterCustom } = attributes;
				return createBlock( metadata.name, {
					...GalleryTransforms( attributes ),
					gutter, gutterCustom,
				} );
			},
			type: 'block',
		},
		{
			blocks: [ 'coblocks/gallery-masonry' ],
			transform: ( attributes, innerBlocks ) => {
				const { gutter, gutterCustom } = attributes;
				const validImages = innerBlocks.map( ( block, index ) => {
					const imageBlockAttributes = block.attributes;
					return {
						alt: imageBlockAttributes?.alt,
						caption: imageBlockAttributes?.caption,
						id: imageBlockAttributes?.id,
						index,
						url: imageBlockAttributes?.url,
					};
				} );
				return createBlock( metadata.name, { gutter, gutterCustom, images: validImages }, [] );
			},
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
						images: validImages.map( ( { id, url, alt, caption }, index ) => ( { index, id, url, alt: alt || '', caption: caption || '' } ) ),
					} );
				}
				return createBlock( metadata.name );
			},
			type: 'block',
		},
		{
			prefix: ':stacked',
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

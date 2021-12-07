/**
 * External dependencies
 */
import filter from 'lodash/filter';
import pick from 'lodash/pick';

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
				'coblocks/gallery-carousel',
				'coblocks/gallery-stacked',
				'coblocks/gallery-offset',
				'core/gallery',
			],
			transform: ( attributes ) => createBlock( metadata.name, GalleryTransforms( attributes ) ),
			type: 'block',
		},
		{
			blocks: [ 'coblocks/gallery-masonry' ],
			transform: ( attributes, innerBlocks ) => {
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
				return createBlock( metadata.name, { images: validImages }, [] );
			},
			type: 'block',
		},
		{
			blocks: [ 'core/image' ],
			isMatch: ( content ) => filter( content, ( { id, url } ) => Number.isInteger( id ) && url ),
			isMultiBlock: true,
			transform: ( content ) =>
				createBlock( metadata.name, {
					captions: !! filter( content, ( { caption } ) => !! caption ),
					ids: content.map( ( { id } ) => id ),
					images: content.map( ( attributes, index ) => ( { ...pick( attributes, [ 'id', 'url', 'alt', 'caption' ] ), index } ) ),
				} ),
			type: 'block',
		},
		{
			prefix: ':collage',
			transform: ( content ) => createBlock( metadata.name, { content } ),
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

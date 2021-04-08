/**
 * External dependencies
 */
import filter from 'lodash/filter';
import pick from 'lodash/pick';

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
				'coblocks/gallery-offset',
				'core/gallery',
			],
			transform: ( attributes ) => createBlock( metadata.name, GalleryTransforms( attributes ) ),
		},
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'core/image' ],
			isMatch: ( content ) => filter( content, ( { id, url } ) => Number.isInteger( id ) && url ),
			transform: ( content ) =>
				createBlock( metadata.name, {
					images: content.map( ( attributes, index ) => ( { ...pick( attributes, [ 'id', 'url', 'alt', 'caption' ] ), index } ) ),
					ids: content.map( ( { id } ) => id ),
					captions: !! filter( content, ( { caption } ) => !! caption ),
				} ),
		},
		{
			type: 'prefix',
			prefix: ':collage',
			transform: ( content ) => createBlock( metadata.name, { content } ),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform: ( attributes ) => createBlock( 'core/gallery', {
				...GalleryTransforms( attributes ),
			} ),
		},
	],
};

export default transforms;

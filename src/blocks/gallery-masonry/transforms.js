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
import { addFilter } from '@wordpress/hooks';
import { createBlock } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Third party block plugins don't have an easy way to detect if the
 * innerBlocks version of the Gallery is running when they run a
 * 3rdPartyBlock -> GalleryBlock transform so this transform filter
 * will handle this. Once the innerBlocks version is the default
 * in a core release, this could be deprecated and removed after
 * plugin authors have been given time to update transforms.
 *
 * @typedef  {Object} Attributes
 * @typedef  {Object} Block
 * @property {Attributes} attributes The attributes of the block.
 * @param    {Block}      block      The transformed block.
 * @return   {Block}                 The transformed block.
 */
function updateThirdPartyTransformToGallery( block ) {
	console.log( 'updateThirdPartyTransformToGallery is running' );
	console.log( block );
	if (
		block.name === 'coblocks/gallery-masonry' &&
		block.attributes?.images?.length > 0
	) {
		console.log( 'updateThirdPartyTransformToGallery is running' );
		const innerBlocks = block.attributes.images.map(
			( { url, id, alt } ) => {
				return createBlock( 'core/image', {
					alt,
					id: id ? parseInt( id, 10 ) : null,
					linkDestination: block.attributes.linkDestination,
					sizeSlug: block.attributes.sizeSlug,
					url,
				} );
			}
		);

		delete block.attributes.ids;
		delete block.attributes.images;
		block.innerBlocks = innerBlocks;
	}

	return block;
}
addFilter(
	'blocks.switchToBlockType.transformedBlock',
	'core/gallery/update-third-party-transform-to',
	updateThirdPartyTransformToGallery
);

const transforms = {
	from: [
		// {
		// 	blocks: [
		// 		'coblocks/gallery-carousel',
		// 		'coblocks/gallery-collage',
		// 'coblocks/gallery-stacked',
		// 		'coblocks/gallery-offset',
		// 		'core/gallery',
		// 	],
		// 	transform: ( attributes ) => createBlock( metadata.name, GalleryTransforms( attributes ) ),
		// 	type: 'block',
		// },
		// {
		// 	from: [
		// 		{
		// 			type: 'block',
		// 			isMultiBlock: true,
		// 			blocks: [ 'core/image' ],
		// 			transform: ( attributes ) => {
		// 				// Init the align and size from the first item which may be either the placeholder or an image.
		// 				let { align, sizeSlug } = attributes[ 0 ];
		// 				// Loop through all the images and check if they have the same align and size.
		// 				align = every( attributes, [ 'align', align ] )
		// 					? align
		// 					: undefined;
		// 				sizeSlug = every( attributes, [ 'sizeSlug', sizeSlug ] )
		// 					? sizeSlug
		// 					: undefined;

		// 				const validImages = filter( attributes, ( { url } ) => url );

		// 				return createBlock( 'core/gallery', {
		// 					images: validImages.map(
		// 						( { id, url, alt, caption } ) => ( {
		// 							id: toString( id ),
		// 							url,
		// 							alt,
		// 							caption,
		// 						} )
		// 					),
		// 					ids: validImages.map( ( { id } ) => parseInt( id, 10 ) ),
		// 					align,
		// 					sizeSlug,
		// 				} );
		// 			},
		// 		},
		// 	],
		// },
		{
			blocks: [
				'core/image',
				'coblocks/gallery-carousel',
				'coblocks/gallery-collage',
				'coblocks/gallery-stacked',
				'coblocks/gallery-offset',
				'core/gallery',
			],
			isMultiBlock: true,
			transform: ( attributes ) => {
				const validImages = filter( attributes, ( { id, url } ) => Number.isInteger( id ) && url );
				const hasCaption = !! filter( attributes, ( { caption } ) => !! caption );

				console.log( validImages );
				if ( validImages.length > 0 ) {
					const innerBlocks = attributes.images.map(
						( { url, id, alt } ) => {
							return createBlock( 'core/image', {
								alt,
								id: id ? parseInt( id, 10 ) : null,
								linkDestination: attributes.linkDestination,
								sizeSlug: attributes.sizeSlug,
								url,
							} );
						}
					);

					return createBlock( metadata.name, {
						captions: hasCaption,
						ids: validImages.map( ( { id } ) => id ),
						images: validImages.map( ( { id, url, alt, caption }, index ) =>
							( { alt: alt || '', caption: caption || '', id, index, url } ) ),
						innerBlocks,
					} );
				}

				return createBlock( metadata.name );
			},
			type: 'block',
		},
		// {
		// 	type: 'prefix',
		// 	prefix: ':masonry',
		// 	transform( content ) {
		// 		return createBlock( metadata.name, {
		// 			content,
		// 		} );
		// 	},
		// },
	],
	to: [
		// {
		// 	blocks: [ 'core/gallery' ],
		// 	transform: ( attributes ) => createBlock( 'core/gallery', {
		// 		...GalleryTransforms( attributes ),
		// 	} ),
		// 	type: 'block',
		// },
	],
};

export default transforms;

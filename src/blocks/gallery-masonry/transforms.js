/**
 * External dependencies
 */
import filter from 'lodash/filter';
import every from 'lodash/every';

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

// /**
//  * Third party block plugins don't have an easy way to detect if the
//  * innerBlocks version of the Gallery is running when they run a
//  * 3rdPartyBlock -> GalleryBlock transform so this transform filter
//  * will handle this. Once the innerBlocks version is the default
//  * in a core release, this could be deprecated and removed after
//  * plugin authors have been given time to update transforms.
//  *
//  * @typedef  {Object} Attributes
//  * @typedef  {Object} Block
//  * @property {Attributes} attributes The attributes of the block.
//  * @param    {Block}      block      The transformed block.
//  * @return   {Block}                 The transformed block.
//  */
// function updateThirdPartyTransformToGallery( block ) {
// 	if (
// 		block.name === 'coblocks/gallery-masonry' &&
// 		block.attributes?.images?.length > 0
// 	) {
// 		const innerBlocks = block.attributes.images.map(
// 			( { url, id, alt } ) => {
// 				return createBlock( 'core/image', {
// 					alt,
// 					id: id ? parseInt( id, 10 ) : null,
// 					linkDestination: block.attributes.linkDestination,
// 					sizeSlug: block.attributes.sizeSlug,
// 					url,
// 				} );
// 			}
// 		);

// 		delete block.attributes.ids;
// 		delete block.attributes.images;
// 		block.innerBlocks = innerBlocks;
// 	}

// 	return block;
// }
// addFilter(
// 	'blocks.switchToBlockType.transformedBlock',
// 	'coblocks/gallery-masonry/update-third-party-transform-to',
// 	updateThirdPartyTransformToGallery
// );

const transforms = {
	from: [
		{
			blocks: [ 'core/image' ],
			isMultiBlock: true,
			transform: ( attributes ) => {
				// Init the align, lightbox and size from the first item which may be either the placeholder or an image.
				let { lightbox, sizeSlug } = !! attributes.length ? attributes[ 0 ] : attributes;
				sizeSlug = every( attributes, [ 'sizeSlug', sizeSlug ] )
					? sizeSlug
					: undefined;
				lightbox = every( attributes, [ 'lightbox', lightbox ] )
					? lightbox
					: undefined;

				const validImages = filter( attributes, ( { url } ) => url );

				const innerImageBlocks = validImages.map( ( image ) => {
					return createBlock( 'core/image', {
						caption: image?.caption,
						filter: image?.filter,
						id: image?.id,
						link: image?.link,
						sizeSlug,
						url: image?.url,
					}, [] );
				} );

				return createBlock( metadata.name,
					{ lightbox },
					innerImageBlocks );
			},
			type: 'block',
		},
		{
			blocks: [
				'coblocks/gallery-carousel',
				'coblocks/gallery-collage',
				'coblocks/gallery-stacked',
				'coblocks/gallery-offset',
				'core/gallery',
			],
			isMultiBlock: true,
			transform: ( attributesArray ) => {
				const validAttributes = attributesArray.reduce( ( prev, cur ) => {
					const conditonalPrevObject = !! prev ? prev : {};
					return {
						...conditonalPrevObject, // Preserve primary attributes from first gallery in array
						images: [
							...prev.images,
							...cur.images,
						],
					};
				} );

				if ( validAttributes.images.length > 0 ) {
					const innerImageBlocks = validAttributes.images.map(
						( { url, id, alt, link } ) => {
							return createBlock( 'core/image', {
								alt,
								id: Number.isInteger( parseInt( id ) ) ? parseInt( id, 10 ) : null,
								link,
								linkDestination: validAttributes.linkDestination,
								sizeSlug: validAttributes.sizeSlug,
								url,
							} );
						}
					);

					return createBlock( metadata.name, {
						caption: validAttributes?.caption,
						lightbox: validAttributes?.lightbox,
					}, innerImageBlocks );
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
				return createBlock( 'core/gallery', { caption: attributes?.caption, images: validImages }, [] );
			},
			type: 'block',
		},
	],
};

export default transforms;

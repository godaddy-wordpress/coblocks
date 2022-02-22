/**
 * External dependencies
 */
import every from 'lodash/every';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

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

					const { gutter, gutterCustom, caption, lightbox } = validAttributes;
					return createBlock( metadata.name, {
						caption,
						gutter,
						gutterCustom,
						lightbox,
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

/**
 * Internal dependencies
 */
import { BLOCK_VARIATION_GALLERY_COLLAGE } from '../../block-variations/core/gallery';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Block constants
 */
const { name } = metadata;

function Edit( { clientId } ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	replaceBlocks(
		[ clientId ],
		switchToBlockType( getBlock( clientId ), 'core/gallery' )
	);

	return null;
}

const settings = {
	edit: Edit,
	parent: [],
	save: () => <InnerBlocks.Content />,
	transforms: {
		to: [
			{
				blocks: [ 'core/gallery' ],
				transform: ( attributes ) => {
					const galleryAttributes = Object.fromEntries(
						Object.entries( attributes ).filter(
							( attribute ) => 'images' !== attribute[ 0 ]
						)
					);

					return createBlock(
						'core/gallery',
						Object.assign( {}, BLOCK_VARIATION_GALLERY_COLLAGE.attributes, galleryAttributes ),
						attributes.images.map( ( image ) => {
							return createBlock( 'core/image', image );
						} ),
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };


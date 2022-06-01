/**
 * Internal dependencies
 */
import { BLOCK_VARIATION_GALLERY_OFFSET } from '../../block-variations/core/gallery';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Block constants
 */
const { name, category } = metadata;

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
	save: () => <InnerBlocks.Content />,
	title: __( 'Offset', 'coblocks' ),
	transforms: {
		to: [
			{
				blocks: [ 'core/gallery' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock(
						'core/gallery',
						Object.assign( {}, BLOCK_VARIATION_GALLERY_OFFSET.attributes, attributes ),
						innerBlocks
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

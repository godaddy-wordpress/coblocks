/**
 * Internal dependencies
 */
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
		switchToBlockType( getBlock( clientId ), 'core/columns' )
	);

	return null;
}

const settings = {
	edit: Edit,
	parent: [],
	save: () => <InnerBlocks.Content />,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/columns' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock(
						'core/columns', attributes,
						innerBlocks.map( ( innerBlock ) => switchToBlockType( innerBlock, 'core/column' ) ).flat()
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };

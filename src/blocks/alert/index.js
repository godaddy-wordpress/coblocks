/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name } = metadata;

function Edit( props ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	replaceBlocks(
		[ props.clientId ],
		switchToBlockType( getBlock( props.clientId ), 'core/paragraph' )
	);

	return null;
}

const settings = {
	title: "Alert",
	edit: Edit,
	parent: [],
	save: () => null,
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( attributes ) => {
					return createBlock( 'core/paragraph', attributes );
				},
			},
		],
	},
};

export { name, metadata, settings };

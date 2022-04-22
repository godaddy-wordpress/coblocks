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

	console.log( props );

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
				transform: ( { value, title } ) => {
					if ( title ) {
						value = title + '<br />' + value;
					}

					if ( ! value || ! value.length ) {
						return createBlock( 'core/paragraph' );
					}
					// transforming an alert element with content
					return createBlock( 'core/paragraph', {
						content: value,
					} );
				},
			},
		],
	},
};

export { name, metadata, settings };

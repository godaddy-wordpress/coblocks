/**
 * External dependencies
 */
import { FoodDrinkIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

function Edit( { clientId } ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	const currentBlock = getBlock( clientId );

	if ( ! currentBlock ) {
		return null;
	}

	replaceBlocks(
		[ clientId ],
		switchToBlockType( currentBlock, 'core/columns' )
	);

	return null;
}

const settings = {
	description: __( 'Display a menu or price list.', 'coblocks' ),
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	title: __( 'Food & Drink', 'coblocks' ),
	transforms: {
		to: [
			{
				blocks: [ 'core/columns' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock(
						'core/columns',
						{}
					);
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };

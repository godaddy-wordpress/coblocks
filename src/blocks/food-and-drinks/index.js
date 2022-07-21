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
const { name, category } = metadata;

const makeEachRowEqualLength = ( totalArray, columnLength ) => {
	const clonedTotalArray = [ ...totalArray ];
	const formattedRows = [];
	const parsedColumnAmount = parseInt( columnLength );

	let currentRow = [];

	while ( clonedTotalArray.length > 0 ) {
		currentRow = clonedTotalArray.splice( 0, parsedColumnAmount );

		formattedRows.push( currentRow );
	}

	const allRowsMatchLength = formattedRows.every( ( col ) => col.length === parsedColumnAmount );

	if ( ! allRowsMatchLength ) {
		const arrayIndexToAlter = formattedRows.findIndex( ( row ) => row.length < parsedColumnAmount );

		if ( arrayIndexToAlter === -1 ) {
			// all rows have the same number of columns
			return;
		}

		const lenCurrRow = formattedRows[ arrayIndexToAlter ].length;

		for ( let j = lenCurrRow; j < parsedColumnAmount; j++ ) {
			formattedRows[ arrayIndexToAlter ].push(
				createBlock(
					'core/column',
					{},
					[
						createBlock( 'core/paragraph', { align: 'center', content: '', placeholder: __( 'Add Title…', 'coblocks' ) }, [] ),
						createBlock( 'core/paragraph', { align: 'center', content: '', placeholder: __( '$0.00', 'coblocks' ) }, [] ),
						createBlock( 'core/paragraph', { align: 'center', content: '', placeholder: __( 'Add description…', 'coblocks' ) }, [] ),
					]
				)
			);
		}
	}

	return formattedRows;
};

function Edit( { clientId } ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	const currentBlock = getBlock( clientId );

	if ( ! currentBlock ) {
		return null;
	}

	const innerBlocksClone = [ ...currentBlock.innerBlocks ];

	// first inner block of Food and Drinks block is the header
	// each subsequent block is a food item block
	const headerBlock = innerBlocksClone[ 0 ];

	innerBlocksClone.shift();

	const formattedColumnBlocks = 	makeEachRowEqualLength(
		innerBlocksClone.map( ( foodItem ) => (
			switchToBlockType( {
				...foodItem,
				attributes: {
					...foodItem.attributes,
					list: currentBlock.attributes.list,
				},
			}, 'core/column' )
		) ).flat(),
		currentBlock.attributes.list === true ? 1 : currentBlock.attributes.columns
	);

	replaceBlocks(
		[ clientId ],
		[
			headerBlock,
			...( formattedColumnBlocks.map( ( fullColumn ) => {
				return createBlock(
					'core/columns',
					{
						align: currentBlock.attributes.className.includes( 'alignwide' ) ? 'wide' : null,
						className: currentBlock.attributes.className,
					},
					fullColumn
				);
			} ) ),
		]
	);

	return null;
}

const settings = {
	description: __( 'Display a menu or price list.', 'coblocks' ),
	edit: Edit,
	parent: [],
	save: () => <InnerBlocks.Content />,
	title: __( 'Food & Drink', 'coblocks' ),
};

export { name, category, metadata, settings };

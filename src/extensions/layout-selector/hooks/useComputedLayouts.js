/**
 * External dependencies
 */
import { orderBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { createBlock, rawHandler } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { cancelIdleCallback, requestIdleCallback } from '../../../utils/background-task-api';

const MAX_SUGGESTED_ITEMS = 6;

const getBlocksFromTemplate = ( name, attributes, innerBlocks = [] ) => {
	return createBlock( name, attributes,
		innerBlocks && innerBlocks.map( ( [ blockName, blockAttributes, blockInnerBlocks ] ) =>
			getBlocksFromTemplate( blockName, blockAttributes, blockInnerBlocks )
		)
	);
};

let taskQueueId = null;
let layoutsQueue = [];
let computedLayouts = [];
let computedCategories = [];

function useComputedLayouts() {
	const layouts = useSelect( ( select ) => select( 'coblocks/template-selector' ).getLayouts(), [] );
	const computedLayoutsStore = useSelect( ( select ) => select( 'coblocks/template-selector' ).getComputedLayouts(), [] );
	const selectedCategory = useSelect( ( select ) => select( 'coblocks/template-selector' ).getSelectedCategory(), [] );
	const { updateComputedLayouts } = useDispatch( 'coblocks/template-selector' );

	const parseBlocks = ( layout ) => {
		if ( ! [ selectedCategory ].includes( layout.category ) ) {
			return layout.parsedBlocks ? layout.parsedBlocks : [];
		}

		if ( layout.blocks ) {
			return layout.blocks.map(
				( block ) => Array.isArray( block ) ? getBlocksFromTemplate( block[ 0 ], block[ 1 ], block[ 2 ] ) : block
			);
		}

		return rawHandler( { HTML: layout.postContent } );
	};

	const parseLayout = ( layout ) => ( { ...layout, parsedBlocks: parseBlocks( layout ) } );

	const processLayoutsQueue = ( deadline ) => {
		while ( ( deadline.timeRemaining() > 0 || deadline.didTimeout ) && layoutsQueue.length ) {
			computedLayouts.push( parseLayout( layoutsQueue.shift() ) );
		}

		// We still have layouts to compute, continue on next available idle time
		if ( layoutsQueue.length ) {
			requestIdleCallback( processLayoutsQueue, { timeout: 1000 } );
			return;
		}

		updateComputedLayouts( computedLayouts );
	};

	useEffect( () => {
		cancelIdleCallback( taskQueueId );
		computedLayouts = [];

		const mostUsedLayouts = orderBy( layouts, [ 'frequency' ], [ 'desc' ] )
			.slice( 0, MAX_SUGGESTED_ITEMS )
			.map( ( layout ) => ( { ...layout, category: 'most-used' } ) );

		layoutsQueue = [
			...mostUsedLayouts,
			...layouts,
		];

		computedCategories = [ selectedCategory ];
		taskQueueId = requestIdleCallback( processLayoutsQueue, { timeout: 1000 } );
	}, [ JSON.stringify( layouts ) ] );

	// Compute layouts on category change to save cpu cycle.
	useEffect( () => {
		if ( computedCategories.includes( selectedCategory ) ) {
			return;
		}

		computedCategories.push( selectedCategory );

		// Here we loop through and parse blocks that weren't parsed before in the firstIdleCallback call.
		updateComputedLayouts( computedLayoutsStore.map( parseLayout ) );
	}, [ selectedCategory ] );

	return computedLayoutsStore;
}

export default useComputedLayouts;

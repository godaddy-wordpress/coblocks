/**
 * External dependencies
 */
import { orderBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock, rawHandler } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

const MAX_SUGGESTED_ITEMS = 6;

const getBlocksFromTemplate = ( name, attributes, innerBlocks = [] ) => {
	return createBlock( name, attributes,
		innerBlocks && innerBlocks.map( ( [ blockName, blockAttributes, blockInnerBlocks ] ) =>
			getBlocksFromTemplate( blockName, blockAttributes, blockInnerBlocks )
		)
	);
};

function useComputedLayouts() {
	const layouts = useSelect( ( select ) => select( 'coblocks/template-selector' ).getLayouts(), [] );
	const computedLayouts = useSelect( ( select ) => select( 'coblocks/template-selector' ).getComputedLayouts(), [] );
	const { updateComputedLayouts } = useDispatch( 'coblocks/template-selector' );

	let taskQueueId = null;
	let layoutsToProcess = [];
	let processedLayouts = [];

	const processBlocks = ( deadline ) => {
		while ( ( deadline.timeRemaining() > 0 || deadline.didTimeout ) && layoutsToProcess.length ) {
			const layout = layoutsToProcess.shift();
			let blocks;

			if ( layout.blocks ) {
				blocks = layout.blocks.map(
					( block ) => Array.isArray( block ) ? getBlocksFromTemplate( block[ 0 ], block[ 1 ], block[ 2 ] ) : block
				);
			} else {
				blocks = rawHandler( { HTML: layout.postContent } );
			}

			const computedLayout = { ...layout, blocks };

			// Remove postContent because blocks retain original content
			// and makes debugging object layout easier to read
			delete computedLayout.postContent;

			processedLayouts.push( computedLayout );
		}

		// We still have layouts to compute, continue on next available idle time
		if ( layoutsToProcess.length ) {
			window.requestIdleCallback( processBlocks, { timeout: 1000 } );
			return;
		}

		const mostUsedLayouts = orderBy( processedLayouts, [ 'frequency' ], [ 'desc' ] )
			.slice( 0, MAX_SUGGESTED_ITEMS )
			.map( ( layout ) => ( { ...layout, category: 'most-used' } ) );

		processedLayouts.push( ...mostUsedLayouts );

		updateComputedLayouts( processedLayouts );
	};

	useEffect( () => {
		window.cancelIdleCallback( taskQueueId );
		processedLayouts = [];
		layoutsToProcess = layouts;
		taskQueueId = window.requestIdleCallback( processBlocks, { timeout: 1000 } );
	}, [ JSON.stringify( layouts ) ] );

	return computedLayouts;
}

export default useComputedLayouts;

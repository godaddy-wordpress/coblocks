/**
 * External dependencies
 */
import { orderBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { createBlock, rawHandler } from '@wordpress/blocks';
import { useMemo } from '@wordpress/element';

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

	return useMemo( () => {
		const computedLayouts = layouts.map(
			( layout ) => {
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

				return computedLayout;
			}
		);

		const mostUsedLayouts = orderBy( computedLayouts, [ 'frequency' ], [ 'desc' ] )
			.slice( 0, MAX_SUGGESTED_ITEMS )
			.map( ( layout ) => ( { ...layout, category: 'most-used' } ) );

		computedLayouts.push( ...mostUsedLayouts );

		return computedLayouts;
	}, [ JSON.stringify( layouts ) ] );
}

export default useComputedLayouts;

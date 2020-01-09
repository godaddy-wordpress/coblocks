/**
 * External dependencies
 */
import { getBlockType, registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Prevents the CoBlocks Buttons block from being insertable.
 */
function deprecateCoBlocksButtonsSettings() {
	const coreButtons = getBlockType( 'core/buttons ' );
	console.log( coreButtons );
	if ( ! coreButtons ) {
		return;
	}

	const coBlocksButtons = getBlockType( 'coblocks/buttons' );
	if ( ! coBlocksButtons ) {
		return;
	}

	unregisterBlockType( 'coblocks/buttons' );
	registerBlockType( 'coblocks/buttons', {
		...coBlocksButtons,
		supports: {
			...coBlocksButtons.supports,
			inserter: false,
		},
	} );
}

domReady( deprecateCoBlocksButtonsSettings );

/**
 * External dependencies
 */
import { getBlockType, registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Prevents the CoBlocks Buttons block from being insertable.
 */
function deprecateCoBlocksButtonsSettings() {
	const coreButtons = getBlockType( 'core/buttons' );
	const coBlocksButtons = getBlockType( 'coblocks/buttons' );
	if ( buttonsBlockDeprecated( coreButtons, coBlocksButtons ) ) {
		unregisterBlockType( 'coblocks/buttons' );
		registerBlockType( 'coblocks/buttons', {
			...coBlocksButtons,
			supports: {
				...coBlocksButtons.supports,
				inserter: false,
			},
		} );
	}
}

/**
 * Check whether or not core/buttons is available for use.
 *
 * @param {Object} coreButtons     The results of getBlockType.
 * @param {Object} coBlocksButtons The results of getBlockType.
 * @return {boolean} True or false if block is deprecated.
 */
export function buttonsBlockDeprecated( coreButtons = getBlockType( 'core/buttons' ), coBlocksButtons = getBlockType( 'coblocks/buttons' ) ) {
	if ( ! coreButtons ) {
		return false;
	}

	if ( ! coBlocksButtons ) {
		return false;
	}
	return true;
}

domReady( deprecateCoBlocksButtonsSettings );

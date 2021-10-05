/**
 * External dependencies
 */
import { getBlockType, registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Prevents the CoBlocks Media Card block from being insertable.
 */
function deprecateCoBlocksMediaCardSettings() {
	const coreMediaText = getBlockType( 'core/media-text' );
	const coBlocksMediaCard = getBlockType( 'coblocks/media-card' );
	if ( mediaCardBlockDeprecated( coreMediaText, coBlocksMediaCard ) ) {
		unregisterBlockType( 'coblocks/media-card' );
		registerBlockType( 'coblocks/media-card', {
			...coBlocksMediaCard,
			supports: {
				...coBlocksMediaCard.supports,
				inserter: false,
			},
		} );
	}
}

/**
 * Check whether or not core/media-card is available for use.
 *
 * @param {Object} coreMediaText     The results of getBlockType.
 * @param {Object} coBlocksMediaCard The results of getBlockType.
 * @return {boolean} True or false if block is deprecated.
 */
export function mediaCardBlockDeprecated( coreMediaText, coBlocksMediaCard ) {
	return ( ! coreMediaText || ! coBlocksMediaCard ) ? false : true;
}

domReady( deprecateCoBlocksMediaCardSettings );

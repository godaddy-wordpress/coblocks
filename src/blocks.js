/**
 * WordPress dependencies
 */
import { getCategories, registerBlockType } from '@wordpress/blocks';

// Register block category
import './utils/block-category';

// Extensions
import './extensions/attributes';
import './extensions/cover-styles';
import './extensions/replace-image';

// Internal Extensions / Components
import './components/gutter-control';

// Formats
import './formats';

// Deprecate Blocks
import './js/deprecations/deprecate-coblocks-buttons.js';

// Register Blocks
import * as buttons from './blocks/buttons';
import * as clickToTweet from './blocks/click-to-tweet';
import * as collage from './blocks/gallery-collage';
import * as dynamicSeparator from './blocks/dynamic-separator';
import * as hero from './blocks/hero';
import * as logos from './blocks/logos';
import * as masonry from './blocks/gallery-masonry';
import * as offset from './blocks/gallery-offset';
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
import * as stacked from './blocks/gallery-stacked';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}

	let { category } = block;

	const { name, settings } = block;

	// See https://github.com/Automattic/jetpack/issues/14598
	const availableCategories = getCategories().map( ( c ) => c.slug );
	switch ( name ) {
		case 'coblocks/click-to-tweet':
		case 'coblocks/logos':
			if ( availableCategories.indexOf( 'grow' ) > -1 ) {
				category = 'grow';
			}
			break;

		case 'coblocks/pricing-table':
			if ( availableCategories.indexOf( 'earn' ) > -1 ) {
				category = 'earn';
			}
			break;

		case 'coblocks/buttons':
		case 'coblocks/dynamic-separator':
		case 'coblocks/gallery-collage':
		case 'coblocks/gallery-masonry':
		case 'coblocks/gallery-offset':
		case 'coblocks/gallery-stacked':
		case 'coblocks/hero':
			category = 'layout';
			break;
	}

	registerBlockType( name, {
		category,
		...settings,
	} );
};

/**
 * Function to register blocks provided by CoBlocks.
 */
export const registerCoBlocksBlocks = () => {
	[
		buttons,
		clickToTweet,
		collage,
		dynamicSeparator,
		hero,
		logos,
		masonry,
		offset,
		pricingTable,
		pricingTableItem,
		stacked,
	].forEach( registerBlock );
};

registerCoBlocksBlocks();

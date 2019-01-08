/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Register block category.
import icons from './utils/block-category';

// Category slug and title.
const category = {
	slug: 'coblocks',
	title: 'CoBlocks',
};

/**
 * Custom foreground icon color
 */
const iconColor = '#536DFF';

/**
 * Utility Editor and Frontend Styles
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Color Settings
 */
import './components/color-settings/inspector-control';

/**
 * Inspector Control
 */
import './components/inspector-control';

/**
 * Register Formats
 */
import './formats/';


/**
 * Register Blocks
 */
import * as accordion from './blocks/accordion';
import * as accordionItem from './blocks/accordion/accordion-item';
import * as alert from './blocks/alert';
import * as author from './blocks/author';
import * as clickToTweet from './blocks/click-to-tweet';
import * as column from './blocks/row/column';
import * as dynamicSeparator from './blocks/dynamic-separator';
import * as gif from './blocks/gif';
import * as gist from './blocks/gist';
import * as highlight from './blocks/highlight';
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
import * as row from './blocks/row';
import * as social from './blocks/social';

export function registerBlocks () {
	[
		accordion,
		accordionItem,
		alert,
		author,
		clickToTweet,
		column,
		dynamicSeparator,
		gif,
		gist,
		highlight,
		pricingTable,
		pricingTableItem,
		row,
		social,
	].forEach( ( block ) => {

		if ( ! block ) {
			return;
		}

		const { name, icon, settings } = block;

		registerBlockType( `coblocks/${ name }`, { category: category.slug, icon: { src: icon, foreground: iconColor, }, ...settings } );
	} );
};
registerBlocks();

/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Category slug and title
const category = {
	slug: 'coblocks',
	title: 'CoBlocks',
};

// Register block category
import './utils/block-category';

// Editor and Frontend Styles
import './styles/editor.scss';
import './styles/style.scss';

// Extensions
import './extensions/colors/inspector';
import './extensions/typography';
import './extensions/attributes';
import './extensions/advanced-controls';
import './extensions/list-styles';
import './extensions/button-styles';
import './extensions/button-controls';

// Formats
import './formats/';

// Sidebars
import './sidebars/block-manager';
import './sidebars/block-manager/deprecated';

// Block Gallery
import './components/block-gallery';

// Register Blocks
import * as accordion from './blocks/accordion';
import * as accordionItem from './blocks/accordion/accordion-item';
import * as alert from './blocks/alert';
import * as author from './blocks/author';
import * as clickToTweet from './blocks/click-to-tweet';
import * as column from './blocks/row/column';
import * as dynamicSeparator from './blocks/dynamic-separator';
import * as form from './blocks/form';
import * as gif from './blocks/gif';
import * as gist from './blocks/gist';
import * as highlight from './blocks/highlight';
import * as foodAndDrinks from './blocks/food-and-drinks';
import * as foodItem from './blocks/food-and-drinks/food-item';
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
import * as row from './blocks/row';
import * as share from './blocks/share';
import * as map from './blocks/map';
import * as mediaCard from './blocks/media-card';
import * as shapeDivider from './blocks/shape-divider';
import * as icon from './blocks/icon';
import * as logos from './blocks/logos';
import * as feature from './blocks/features/feature';
import * as features from './blocks/features';
import * as buttons from './blocks/buttons';
import * as hero from './blocks/hero';
import * as services from './blocks/services';
import * as service from './blocks/services/service';
import * as stacked from './blocks/gallery-stacked';
import * as masonry from './blocks/gallery-masonry';
import * as carousel from './blocks/gallery-carousel';
import * as socialProfiles from './blocks/social-profiles';

export function registerBlocks() {
	[
		accordion,
		accordionItem,
		alert,
		author,
		buttons,
		carousel,
		clickToTweet,
		column,
		dynamicSeparator,
		feature,
		features,
		foodAndDrinks,
		foodItem,
		form,
		gif,
		gist,
		hero,
		highlight,
		icon,
		logos,
		map,
		masonry,
		mediaCard,
		pricingTable,
		pricingTableItem,
		row,
		services,
		service,
		shapeDivider,
		share,
		stacked,
		socialProfiles,
	].forEach( block => {
		if ( ! block ) {
			return;
		}

		const { name, icon, settings } = block;

		registerBlockType( `coblocks/${ name }`, {
			category: category.slug,
			icon: { src: icon },
			...settings,
		} );
	} );
}
registerBlocks();

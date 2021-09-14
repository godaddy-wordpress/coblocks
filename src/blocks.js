/**
 * WordPress dependencies
 */
import {
	registerBlockType,
} from '@wordpress/blocks';

// Register block category
import './utils/block-category';

// Utils
import './js/coblocks-color-fix';

// Extensions
import './extensions/animation';
import './extensions/colors/inspector';
import './extensions/typography';
import './extensions/attributes';
import './extensions/advanced-controls';
import './extensions/padding-controls';
import './extensions/list-styles';
import './extensions/button-styles';
import './extensions/button-controls';
import './extensions/image-styles';
import './extensions/cover-styles';
import './extensions/media-text-styles';
import './extensions/lightbox-controls';
import './extensions/replace-image';
import './extensions/image-crop';
import './extensions/image-filter';
import './extensions/coblocks-settings/';
import './extensions/layout-selector';
import './extensions/block-patterns';

// Internal Extensions / Components
import './components/gutter-control';
import './components/form-label-colors';

// Formats
import './formats';

// Categories Helper
import { supportsCollections } from './utils/block-helpers';

// Deprecate Blocks
import './js/deprecations/deprecate-coblocks-buttons.js';
import './js/deprecations/deprecate-coblocks-media-card.js';

// Register Blocks
import * as accordion from './blocks/accordion';
import * as accordionItem from './blocks/accordion/accordion-item';
import * as alert from './blocks/alert';
import * as author from './blocks/author';
import * as buttons from './blocks/buttons';
import * as carousel from './blocks/gallery-carousel';
import * as clickToTweet from './blocks/click-to-tweet';
import * as collage from './blocks/gallery-collage';
import * as column from './blocks/row/column';
import * as dynamicSeparator from './blocks/dynamic-separator';
import * as events from './blocks/events';
import * as eventItem from './blocks/events/event-item';
import * as feature from './blocks/features/feature';
import * as features from './blocks/features';
import * as foodAndDrinks from './blocks/food-and-drinks';
import * as foodItem from './blocks/food-and-drinks/food-item';
import * as form from './blocks/form';
import * as fieldDate from './blocks/form/fields/date';
import * as fieldEmail from './blocks/form/fields/email';
import * as fieldName from './blocks/form/fields/name';
import * as fieldRadio from './blocks/form/fields/radio';
import * as fieldTelephone from './blocks/form/fields/phone';
import * as fieldTextarea from './blocks/form/fields/textarea';
import * as fieldText from './blocks/form/fields/text';
import * as fieldSelect from './blocks/form/fields/select';
import * as fieldSubmitButton from './blocks/form/fields/submit-button';
import * as fieldCheckbox from './blocks/form/fields/checkbox';
import * as fieldWebsite from './blocks/form/fields/website';
import * as fieldHidden from './blocks/form/fields/hidden';
import * as gif from './blocks/gif';
import * as gist from './blocks/gist';
import * as hero from './blocks/hero';
import * as highlight from './blocks/highlight';
import * as icon from './blocks/icon';
import * as logos from './blocks/logos';
import * as map from './blocks/map';
import * as masonry from './blocks/gallery-masonry';
import * as mediaCard from './blocks/media-card';
import * as offset from './blocks/gallery-offset';
import * as openTable from './blocks/opentable';
import * as posts from './blocks/posts';
import * as postCarousel from './blocks/post-carousel';
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
import * as row from './blocks/row';
import * as service from './blocks/services/service';
import * as services from './blocks/services';
import * as shapeDivider from './blocks/shape-divider';
import * as share from './blocks/share';
import * as socialProfiles from './blocks/social-profiles';
import * as stacked from './blocks/gallery-stacked';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}

	let { category } = block;

	const { name, settings } = block;

	if ( ! supportsCollections() && ! name.includes( 'gallery' ) ) {
		category = 'coblocks';
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
		accordion,
		accordionItem,
		alert,
		author,
		buttons,
		carousel,
		clickToTweet,
		collage,
		column,
		dynamicSeparator,
		events,
		eventItem,
		feature,
		features,
		fieldDate,
		fieldEmail,
		fieldName,
		fieldRadio,
		fieldTelephone,
		fieldTextarea,
		fieldText,
		fieldSelect,
		fieldSubmitButton,
		fieldCheckbox,
		fieldWebsite,
		fieldHidden,
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
		offset,
		openTable,
		posts,
		postCarousel,
		pricingTable,
		pricingTableItem,
		row,
		service,
		services,
		shapeDivider,
		share,
		socialProfiles,
		stacked,
	].forEach( registerBlock );
};

registerCoBlocksBlocks();

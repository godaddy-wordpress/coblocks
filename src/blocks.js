/**
 * WordPress dependencies
 */
import {
	getCategories, // wpcom-custom
	registerBlockType,
} from '@wordpress/blocks';

// Register block category
import './utils/block-category';

// Extensions
// wpcom-disabled-start
// import './extensions/colors/inspector';
// import './extensions/typography';
// wpcom-disabled-end
import './extensions/attributes';
// wpcom-disabled-start
// import './extensions/advanced-controls';
// import './extensions/padding-controls';
// import './extensions/list-styles';
// import './extensions/button-styles';
// import './extensions/button-controls';
// import './extensions/image-styles';
// wpcom-disabled-end
import './extensions/cover-styles';
// wpcom-disabled-start
// import './extensions/lightbox-controls';
// wpcom-disabled-end
import './extensions/replace-image';
// wpcom-disabled-start
// import './extensions/image-crop';
// import './extensions/coblocks-settings/';
// import './extensions/layout-selector';

// Formats
import './formats';

// Categories Helper
// wpcom-disabled-start
// import { supportsCollections } from './utils/block-helpers';
// wpcom-disabled-end

// Deprecate Blocks
import './js/deprecations/deprecate-coblocks-buttons.js';

// Register Blocks

// Register Blocks
// wpcom-disabled-start
// import * as accordion from './blocks/accordion';
// import * as accordionItem from './blocks/accordion/accordion-item';
// import * as alert from './blocks/alert';
// import * as author from './blocks/author';
// wpcom-disabled-end
import * as buttons from './blocks/buttons';
// wpcom-disabled-start
// import * as carousel from './blocks/gallery-carousel';
// wpcom-disabled-end
import * as clickToTweet from './blocks/click-to-tweet';
import * as collage from './blocks/gallery-collage';
// wpcom-disabled-start
// import * as column from './blocks/row/column';
// wpcom-disabled-end
import * as dynamicSeparator from './blocks/dynamic-separator';
// wpcom-disabled-start
// import * as events from './blocks/events';
// import * as eventItem from './blocks/events/event-item';
// import * as feature from './blocks/features/feature';
// import * as features from './blocks/features';
// import * as foodAndDrinks from './blocks/food-and-drinks';
// import * as foodItem from './blocks/food-and-drinks/food-item';
// import * as form from './blocks/form';
// import * as fieldDate from './blocks/form/fields/date';
// import * as fieldEmail from './blocks/form/fields/email';
// import * as fieldName from './blocks/form/fields/name';
// import * as fieldRadio from './blocks/form/fields/radio';
// import * as fieldTelephone from './blocks/form/fields/phone';
// import * as fieldTextarea from './blocks/form/fields/textarea';
// import * as fieldText from './blocks/form/fields/text';
// import * as fieldSelect from './blocks/form/fields/select';
// import * as fieldSubmitButton from './blocks/form/fields/submit-button';
// import * as fieldCheckbox from './blocks/form/fields/checkbox';
// import * as fieldWebsite from './blocks/form/fields/website';
// import * as fieldHidden from './blocks/form/fields/hidden';
// import * as gif from './blocks/gif';
// import * as gist from './blocks/gist';
// wpcom-disabled-end
import * as hero from './blocks/hero';
// wpcom-disabled-start
// import * as highlight from './blocks/highlight';
// import * as icon from './blocks/icon';
// wpcom-disabled-end
import * as logos from './blocks/logos';
// wpcom-disabled-start
// import * as map from './blocks/map';
// wpcom-disabled-end
import * as masonry from './blocks/gallery-masonry';
// wpcom-disabled-start
// import * as mediaCard from './blocks/media-card';
// wpcom-disabled-end
import * as offset from './blocks/gallery-offset';
// wpcom-disabled-start
// import * as posts from './blocks/posts';
// import * as postCarousel from './blocks/post-carousel';
// wpcom-disabled-end
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
// wpcom-disabled-start
// import * as row from './blocks/row';
// import * as service from './blocks/services/service';
// import * as services from './blocks/services';
// import * as shapeDivider from './blocks/shape-divider';
// import * as share from './blocks/share';
// import * as socialProfiles from './blocks/social-profiles';
// wpcom-disabled-end
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

	// wpcom-disabled-start
	// if ( ! supportsCollections() && ! name.includes( 'gallery' ) ) {
	// 	category = 'coblocks';
	// }
	// wpcom-disabled-end

	// wpcom-custom-start
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
	// wpcom-custom-end

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
		// wpcom-disabled-start
		// accordion,
		// accordionItem,
		// wpcom-disabled-end
		alert,
		// wpcom-disabled-start
		// author,
		// wpcom-disabled-end
		buttons,
		// wpcom-disabled-start
		// carousel,
		// wpcom-disabled-end
		clickToTweet,
		collage,
		// wpcom-disabled-start
		// column,
		// wpcom-disabled-end
		dynamicSeparator,
		// wpcom-disabled-start
		// events,
		// eventItem,
		// feature,
		// features,
		// fieldDate,
		// fieldEmail,
		// fieldName,
		// fieldRadio,
		// fieldTelephone,
		// fieldTextarea,
		// fieldText,
		// fieldSelect,
		// fieldSubmitButton,
		// fieldCheckbox,
		// fieldWebsite,
		// fieldHidden,
		// foodAndDrinks,
		// foodItem,
		// form,
		// gif,
		// gist,
		// wpcom-disabled-end
		hero,
		// wpcom-disabled-start
		// highlight,
		// icon,
		// wpcom-disabled-end
		logos,
		// wpcom-disabled-start
		// map,
		// wpcom-disabled-end
		masonry,
		// wpcom-disabled-start
		// mediaCard,
		// wpcom-disabled-end
		offset,
		// wpcom-disabled-start
		// posts,
		// postCarousel,
		// wpcom-disabled-end
		pricingTable,
		pricingTableItem,
		// wpcom-disabled-start
		// row,
		// service,
		// services,
		// shapeDivider,
		// share,
		// socialProfiles,
		// wpcom-disabled-end
		stacked,
	].forEach( registerBlock );
};

registerCoBlocksBlocks();

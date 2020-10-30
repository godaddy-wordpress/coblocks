/**
 * WordPress dependencies
 */
import {
	// WP.com custom - START
	getCategories,
	// WP.com custom - END
	registerBlockType,
} from '@wordpress/blocks';
// WP.com custom - START
import { __, sprintf } from '@wordpress/i18n';
// WP.com custom - END

// Register block category
import './utils/block-category';

// Extensions
// WP.com custom - START
// import './extensions/colors/inspector';
// import './extensions/typography';
// WP.com custom - END
import './extensions/attributes';
// WP.com custom - START
// import './extensions/advanced-controls';
// import './extensions/padding-controls';
// import './extensions/list-styles';
// import './extensions/button-styles';
// import './extensions/button-controls';
// import './extensions/image-styles';
// WP.com custom - END
import './extensions/cover-styles';
// WP.com custom - START
// import './extensions/lightbox-controls';
// WP.com custom - END
import './extensions/replace-image';
// WP.com custom - START
// import './extensions/image-crop';
// WP.com custom - END
import './extensions/coblocks-settings/';
// WP.com custom - START
// import './extensions/layout-selector';
// WP.com custom - END

// Formats
import './formats';

// Categories Helper
import { supportsCollections } from './utils/block-helpers';

// Deprecate Blocks
import './js/deprecations/deprecate-coblocks-buttons.js';

// Register Blocks
// WP.com custom - START
// import * as accordion from './blocks/accordion';
// import * as accordionItem from './blocks/accordion/accordion-item';
// import * as alert from './blocks/alert';
// import * as author from './blocks/author';
// WP.com custom - END
import * as buttons from './blocks/buttons';
// WP.com custom - START
// import * as carousel from './blocks/gallery-carousel';
// WP.com custom - END
import * as clickToTweet from './blocks/click-to-tweet';
import * as collage from './blocks/gallery-collage';
// WP.com custom - START
// import * as column from './blocks/row/column';
// WP.com custom - END
import * as dynamicSeparator from './blocks/dynamic-separator';
// WP.com custom - START
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
// WP.com custom - END
import * as hero from './blocks/hero';
// WP.com custom - START
// import * as highlight from './blocks/highlight';
// import * as icon from './blocks/icon';
// WP.com custom - END
import * as logos from './blocks/logos';
// WP.com custom - START
// import * as map from './blocks/map';
// WP.com custom - END
import * as masonry from './blocks/gallery-masonry';
// WP.com custom - START
// import * as mediaCard from './blocks/media-card';
// WP.com custom - END
import * as offset from './blocks/gallery-offset';
// WP.com custom - START
// import * as posts from './blocks/posts';
// import * as postCarousel from './blocks/post-carousel';
// WP.com custom - END
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table/pricing-table-item';
// WP.com custom - START
// import * as row from './blocks/row';
// import * as services from './blocks/services';
// import * as service from './blocks/services/service';
// import * as shapeDivider from './blocks/shape-divider';
// import * as share from './blocks/share';
// import * as socialProfiles from './blocks/social-profiles';
// WP.com custom - END
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

	// WP.com custom - START
	//if ( ! supportsCollections() && ! name.includes( 'gallery' ) ) {
	//	category = 'coblocks';
	//}

	// See https://github.com/Automattic/jetpack/issues/14598
	const availableCategories = wp.blocks.getCategories().map( category => category.slug );
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
	// WP.com custom - END

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
		// WP.com custom - START
		// accordion,
		// accordionItem,
		// alert,
		// author,
		// WP.com custom - END
		buttons,
		// WP.com custom - START
		// carousel,
		// WP.com custom - END
		clickToTweet,
		collage,
		// WP.com custom - START
		// column,
		// WP.com custom - END
		dynamicSeparator,
		// WP.com custom - START
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
		// fieldSubmitButton
		// fieldCheckbox,
		// fieldWebsite,
		// fieldHidden,
		// foodAndDrinks,
		// foodItem,
		// form,
		// gif,
		// gist,
		// WP.com custom - END
		hero,
		// WP.com custom - START
		// highlight,
		// icon,
		// WP.com custom - END
		logos,
		// WP.com custom - START
		// map,
		// WP.com custom - END
		masonry,
		// WP.com custom - START
		// mediaCard,
		// WP.com custom - END
		offset,
		// WP.com custom - START
		// posts,
		// postCarousel,
		// WP.com custom - END
		pricingTable,
		pricingTableItem,
		// WP.com custom - START
		// row,
		// service,
		// services,
		// shapeDivider,
		// share,
		// socialProfiles,
		// WP.com custom - END
		stacked,
	].forEach( registerBlock );
};

registerCoBlocksBlocks();

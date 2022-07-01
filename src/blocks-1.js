import { registerBlock } from './utils/helper';

// Styles
// index.scss name implies editor styles. Output will be coblocks-1.js.
import './styles/index.scss';
// style.scss name implies frontend styles. Output will be style-coblocks-1.js.
import './styles/style.scss';

// Deprecate Blocks
import './js/deprecations/deprecate-coblocks-buttons.js';
import './js/deprecations/deprecate-coblocks-media-card.js';

// Register Blocks
import * as accordion from './blocks/accordion';
import * as accordionItem from './blocks/accordion/accordion-item';
import * as alert from './blocks/alert';
import * as author from './blocks/author';
import * as buttons from './blocks/buttons';
import * as carousel from './blocks/carousel';
import * as galleryCarousel from './blocks/gallery-carousel';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	accordion,
	accordionItem,
	alert,
	author,
	buttons,
	galleryCarousel,
	carousel,
].forEach( registerBlock );

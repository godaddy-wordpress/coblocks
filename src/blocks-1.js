import { registerBlock } from './utils/helper';

// Styles
import './styles/index.scss';
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
import * as carousel from './blocks/gallery-carousel';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	accordion,
	accordionItem,
	alert,
	author,
	buttons,
	carousel,

].forEach( registerBlock );

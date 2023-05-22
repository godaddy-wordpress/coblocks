import { registerBlockV2 } from './utils/helper';

// Styles
import './styles/blocks/search.scss';

// Register Block in JS
import { metadata, settings } from './blocks/search';

/**
 * Function to register blocks provided by CoBlocks.
 */
registerBlockV2( metadata, settings );

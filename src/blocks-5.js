import { registerBlock } from './utils/helper';

// Register Blocks
import * as logos from './blocks/logos';
import * as masonry from './blocks/gallery-masonry';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	logos,
	masonry,
].forEach( registerBlock );

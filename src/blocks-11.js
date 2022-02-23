import { registerBlock } from './utils/helper';

// Register Blocks
import * as postCarousel from './blocks/post-carousel';
import * as posts from './blocks/posts';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	posts,
	postCarousel,
].forEach( registerBlock );

import { registerBlock } from './utils/helper';

// Register Blocks
import * as postCarousel from './blocks/post-carousel';
import * as posts from './blocks/posts';
import * as testimonial from './blocks/testimonials/testimonial';
import * as testimonials from './blocks/testimonials';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	posts,
	postCarousel,
	testimonial,
	testimonials,
].forEach( registerBlock );

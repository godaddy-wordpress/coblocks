import { registerBlock } from './utils/helper';

// Register Blocks
import * as map from './blocks/map';
import * as mediaCard from './blocks/media-card';
import * as offset from './blocks/gallery-offset';
import * as openTable from './blocks/opentable';
import * as postCarousel from './blocks/post-carousel';
import * as posts from './blocks/posts';
import * as testimonial from './blocks/testimonials/testimonial';
import * as testimonials from './blocks/testimonials';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	map,
	mediaCard,
	offset,
	openTable,
	postCarousel,
	posts,
	testimonial,
	testimonials,
].forEach( registerBlock );

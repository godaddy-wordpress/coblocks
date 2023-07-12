import { registerBlock } from './utils/helper';

// Register Blocks
import * as clickToTweet from './blocks/click-to-tweet';
import * as collage from './blocks/gallery-collage';
import * as foodAndDrinks from './blocks/food-and-drinks';
import * as foodItem from './blocks/food-and-drinks/food-item';

/**
 * Function to register blocks provided by CoBlocks.
 */
[
	clickToTweet,
	collage,
	foodAndDrinks,
	foodItem,
].forEach( registerBlock );
